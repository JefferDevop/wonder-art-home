import React from "react";
import { Carousel } from "react-responsive-carousel";
import { BASE_NAME } from "@/config/constants";
import ReactPlayer from "react-player";

import "react-responsive-carousel/lib/styles/carousel.min.css";

import styles from "./ImageCarousel.module.scss";
import { CardImg } from "reactstrap";

export function ImageCarousel(props) {
  const { gallery } = props;

  const renderContent = () => {
    switch (true) {
      case item.video_url !== null:
        return (
          <ReactPlayer
            url={item.video_url}
            width={"100%"}
            height={"100%"}
            controls={true}
          />
        );

      case item.images !== null:
        return <CardImg alt={`Slide ${index}`} src={BASE_NAME + item.images} />;

      case item.image !== null:
      case item.image_alterna !== null:
        return (
          <CardImg
            alt={`Slide ${index}`}
            src={item.image || item.image_alterna}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className={styles.content}>
  <Carousel
    infiniteLoop
    preventMovementUntilSwipeScrollTolerance
    dynamicHeight
    showStatus={false}
    showThumbs={false}
  >
    {gallery &&
      gallery.length > 0 &&
      gallery
        .filter(
          (item) =>
            (item.video_url && item.video_url.trim() !== '') ||
            (item.images && item.images.trim() !== '') ||
            (item.image && item.image.trim() !== '') ||
            (item.image_alterna && item.image_alterna.trim() !== '')
        )
        .map((item, index) => (
          <div className={styles.carousel_vim} key={index}>
            {item.video_url ? (
              <ReactPlayer
                url={item.video_url}
                width="100%"
                height="100%"
                controls
              />
            ) : item.images ? (
              <CardImg alt={`Slide ${index}`} src={BASE_NAME + item.images} />
            ) : item.image ? (
              <CardImg alt={`Slide ${index}`} src={BASE_NAME + item.image} />
            ) : item.image_alterna ? (
              <CardImg alt={`Slide ${index}`} src={item.image_alterna} />
            ) : (
              <p>No hay contenido para mostrar en este elemento.</p>
            )}
          </div>
        ))}
  </Carousel>
</div>

  );
}
