import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import styles from "./styles.module.css";

type Props = {
  title: string;
  content: string;
  url?: string;
  links?: string[];
};

export default function OutlinedCard({ title, content, url, links }: Props) {
  return (
    <Box className={styles.boxContainer}>
      <Card variant="outlined" className={styles.cardContainer}>
        <CardContent>
          <Typography variant="h5" className={styles.title} component="div">
            {title}
          </Typography>
          <Typography variant="body2" className={styles.content}>
            {content}
          </Typography>
        </CardContent>

        <CardActions>
          <Button
            size="small"
            onClick={() => {
              if (doc) {
                globalData["docusaurus-plugin-content-docs"].default["versions"].map((v) => {
                  if (location.pathname.includes(v.path)) {
                    history.push(`${v.path}/${doc}`);
                  }
                });
              } else if (url) {
                window.open(url, "_blank", "noopener,noreferrer");
              }
            }}
          >
            Learn More
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}
