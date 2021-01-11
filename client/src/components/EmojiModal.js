import { useEffect, useState } from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";

import { Divider } from "@material-ui/core";
import API from "../utils/API";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";

export default function EmojiModal(props) {
  const [emoji, setEmoji] = useState([]);
  const [loading, setLoading] = useState(true);
  const { onClose, selectedValue, open } = props;

  useEffect(() => {
    getEmoji();
  }, []);

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  async function getEmoji() {
    let response = await API.getEmojis();
    setEmoji(response.data);
    setLoading(false);
  }

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">Add Emoji 😃 </DialogTitle>

      <Divider variant="middle" />

      <GridList cellHeight={50} cols={4}>
        {!loading ? (
          emoji.map((icon) => {
            return (
              <GridListTile cols={icon.cols || 1}>
                <GridListTileBar
                  title={icon.character}
                  onClick={() => console.log(`${icon.slug} has been clicked`)}
                ></GridListTileBar>
              </GridListTile>
            );
          })
        ) : (
          <p>I'll add a spinner here</p>
        )}
      </GridList>
    </Dialog>
  );
}
