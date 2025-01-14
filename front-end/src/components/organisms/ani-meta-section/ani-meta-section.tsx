import React from 'react';
import { Typography, Divider, Grid } from 'antd';
import { CssKeyObject } from 'types/css-basic-type';
import { Rating, ThumbnailCard } from 'components';
import { Store } from 'types/common';
import {
  Ani,
  AniGenreDict,
  AniRateDict,
  AniStatusDict,
} from 'stores/ani/model/ani';

const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

const styles: CssKeyObject = {
  container: {
    backgroundColor: '#181818',
    padding: '2em',
  },
  content: {
    display: 'flex',
    margin: '0 auto',
    maxWidth: '60em',
    minWidth: '60em',
  },
  contentMobile: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  thumbnailContainer: {
    width: '40%',
  },
  thumbnailContainerMobile: {
    marginBottom: '1.5em',
  },
  animeInfoContainer: {
    width: '60%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  animeInfoContainerMobile: {
    textAlign: 'center',
  },
  divider: {
    backgroundColor: 'whitesmoke',
    margin: '2em 0',
  },
  metaData: {
    color: '#b2b2b2',
  },
  title: {
    marginTop: '0',
    color: 'whitesmoke',
  },
  jenre: {
    color: 'whitesmoke',
    fontSize: '1.2rem',
  },
  estimatedRating: {
    color: '#ff9999',
    fontSize: '1.2rem',
  },
  realRating: {
    color: '#b2b2b2',
    fontSize: '1.2rem',
    marginLeft: '1em',
  },
};

const AniMetaSection = ({ info, store }: { info: Ani; store: Store }) => {
  const { xs } = useBreakpoint();

  return (
    <section style={styles.container}>
      <div style={xs ? styles.contentMobile : styles.content}>
        <div
          style={
            xs ? styles.thumbnailContainerMobile : styles.thumbnailContainer
          }
        >
          <ThumbnailCard id={info.id} store={store} />
        </div>
        <div
          style={
            xs ? styles.animeInfoContainerMobile : styles.animeInfoContainer
          }
        >
          <div>
            <Text style={styles.metaData}>
              {info.type}
              {' '}
              |
              {' '}
              {AniRateDict[info.rate]}
              {' '}
              |
              {' '}
              {AniStatusDict[info.status]}
            </Text>
            <Title style={styles.title}>{info.koreanName}</Title>
            <Text style={styles.jenre}>
              {info.genres.map((genre) => (
                <span key={genre.id}>
                  {AniGenreDict[genre.id]}
                  {' / '}
                </span>
              ))}
            </Text>
            <section>
              <Text style={styles.estimatedRating}>
                예상 ☆
                {' '}
                {info.predictedScore === 0
                  ? '점수가 없습니다.'
                  : (info.predictedScore / 2).toFixed(1)}
              </Text>
              <Text style={styles.realRating}>
                평점 ☆
                {' '}
                {info.avgScore === 0
                  ? '점수가 없습니다.'
                  : (info.avgScore / 2).toFixed(1)}
              </Text>
            </section>
          </div>
          <Divider style={styles.divider} />
          <div>
            <Rating store={store} info={info} />
          </div>
        </div>
      </div>
    </section>
  );
};
export default AniMetaSection;
