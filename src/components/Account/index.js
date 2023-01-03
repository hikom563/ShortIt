import React from "react";
import { useState, Fragment, useEffect, useCallback, useMemo } from "react";
import Navbar from "./Navbar";
import {
  Grid,
  Box,
  Typography,
  Button,
  Divider,
  Snackbar,
  CircularProgress,
} from "@material-ui/core";
import LinkCard from "./LinkCard";
import ShortenURLModal from "./ShortenURLModal";
import { app, firestore, auth } from "../../firebase";
import { nanoid } from "nanoid";
import copy from "copy-to-clipboard";

// const dummyData = [
//   {
//     id: "747rtvruynbrb",
//     createdAt: new Date(),
//     name: "My Website",
//     longURL: "https://google.com",
//     shortCode: "wakeu",
//     totalClicks: 50,
//   },

//   {
//     id: "747rruynbrb",
//     createdAt: new Date(),
//     name: "E-book",
//     longURL: "https://drive.google.com/acrerwvat",
//     shortCode: "8uiou",
//     totalClicks: 517,
//   },
//   {
//     id: "747r45ruynbrb",
//     createdAt: new Date(),
//     name: "E-book",
//     longURL: "https://drive.google.com/acrerwvat",
//     shortCode: "8uiou",
//     totalClicks: 517,
//   },
// ];

const Account = () => {
  const [fetchingLinks, setFetchingLinks] = useState(true);
  const [newLinkToaster, setNewLinkToaster] = useState(false);
  const [links, setLinks] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const userUid = auth.currentUser.uid;
  const linksPathRef = useMemo(
    () => firestore.collection("users").doc(userUid).collection("links"),
    [userUid]
  );

  const handleCreateShortenLink = async (name, longURL) => {
    const link = {
      name,
      longURL:
        longURL.includes("http://") || longURL.includes("https://")
          ? longURL
          : `http://${longURL}`,
      createdAt: app.firestore.FieldValue.serverTimestamp(),
      shortCode: nanoid(6),
      totalClicks: 0,
    };

    const resp = await linksPathRef.add(link);

    setLinks((links) => [
      ...links,
      { ...link, createdAt: new Date(), id: resp.id },
    ]);

    setOpenModal(false);
  };

  useEffect(() => {
    const fetchLinks = async () => {
      const snapShot = await linksPathRef.get();

      const tempLinks = [];

      snapShot.forEach((doc) =>
        tempLinks.push({
          ...doc.data(),
          id: doc.id,
          createdAt: doc.data().createdAt.toDate(),
        })
      );
      setLinks(tempLinks);
      setTimeout(() => setFetchingLinks(false), 1000);
    };

    fetchLinks();
  }, [linksPathRef]);

  const handleDeleteLink = useCallback(
    async (linkDocID) => {
      if (window.confirm("Do you want to delete the link?")) {
        await linksPathRef.doc(linkDocID).delete();
        setLinks((oldLinks) =>
          oldLinks.filter((link) => link.id !== linkDocID)
        );
      }
    },
    [linksPathRef]
  );

  const handleCopyLink = useCallback((shortUrl) => {
    copy(shortUrl);
    setNewLinkToaster(true);
  }, []);

  return (
    <>
      <Snackbar
        open={newLinkToaster}
        onClose={() => setNewLinkToaster(false)}
        autoHideDuration={2000}
        message="Link copied to the Clipboard"
      />
      {openModal && (
        <ShortenURLModal
          createShortenLink={handleCreateShortenLink}
          open={openModal}
          handleClose={() => setOpenModal(false)}
        />
      )}
      <Navbar />
      <Box mt={{ xs: 3, sm: 5 }} p={{ xs: 2, sm: 0 }}>
        <Grid container justify="center">
          <Grid item xs={12} sm={8}>
            <Box mb={5} display="flex">
              <Box mr={3}>
                <Typography variant="h4">Links</Typography>
              </Box>
              <Button
                onClick={() => setOpenModal(true)}
                disableElevation
                variant="contained"
                color="primary"
              >
                Create new
              </Button>
            </Box>

            {fetchingLinks ? (
              <Box textAlign="center">
                <CircularProgress />
              </Box>
            ) : !links.length ? (
              <Box textAlign="center">
                <img
                  style={{
                    width: "225px",
                    height: "auto",
                    marginBottom: "24px",
                  }}
                  src="/assets/EmptyLinks.svg"
                  alt="No links"
                />
                <Typography>
                  {" "}
                  I don't like loneliness, Please add Links{" "}
                </Typography>
              </Box>
            ) : (
              links
                .sort(
                  (prevLink, nextLink) =>
                    nextLink.createdAt - prevLink.createdAt
                )
                .map((link, idx) => (
                  <Fragment key={link.id}>
                    <LinkCard
                      {...link}
                      deleteLink={handleDeleteLink}
                      copyLink={handleCopyLink}
                    />
                    {idx !== links.length - 1 && (
                      <Box my={4}>
                        <Divider />
                      </Box>
                    )}
                  </Fragment>
                ))
            )}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Account;
