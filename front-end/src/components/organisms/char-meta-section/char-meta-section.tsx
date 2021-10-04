import React from 'react';
import { Typography } from 'antd';
import { CssKeyObject } from '../../../types/css-basic-type';
import { ReviewFormCard, ReviewSliderCard, ThumbnailCard } from '../..';
import { Store } from '../../../types/common';
import { Character } from '../../../stores/character/model/character';

const styles: CssKeyObject = {
  container: {
    backgroundColor: '#181818',
    padding: '2em',
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    margin: '0 auto',
    maxWidth: '70em',
    minWidth: '70em',
    height: '87.9vh',
  },
  thumbnailContainer: {
    width: '40%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  charName: { fontFamily: 'titleFont', color: 'whitesmoke' },
  seiyu: { fontSize: '1.2rem', color: 'whitesmoke', marginBottom: '0.5em' },
  animeInfoContainer: {
    width: '60%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    color: 'whitesmoke',
  },
  title: {
    color: 'inherit',
    marginTop: '0',
  },
  sub: {
    fontSize: '1.5rem',
    color: 'inherit',
  },
};

const CharMetaSection = ({
  info,
  store,
}: {
  info: Character;
  store: Store;
}) => (
  <section style={styles.container}>
    <div style={styles.content}>
      <div style={styles.thumbnailContainer}>
        <Typography.Title style={styles.charName}>
          {info.lastName + info.firstName}
        </Typography.Title>
        <Typography.Text style={styles.seiyu}>
          성우 ▶
          {' '}
          {info.seiyu.name}
        </Typography.Text>
        <ThumbnailCard id={info.id} store={store} />
      </div>
      <div style={styles.animeInfoContainer}>
        <ReviewFormCard id={info.id} />
        <ReviewSliderCard />
      </div>
    </div>
  </section>
);
export default CharMetaSection;
