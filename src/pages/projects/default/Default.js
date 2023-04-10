import sliceBackgroundLarge from 'assets/slice-background-large.jpg';
import sliceBackgroundPlaceholder from 'assets/slice-background-placeholder.jpg';
import sliceBackground from 'assets/slice-background.jpg';

import { Footer } from 'components/Footer';
import { Meta } from 'components/Meta';
import { ProjectBackground, ProjectContainer, ProjectHeader } from 'layouts/Project';
import { Fragment } from 'react';
import styles from './Default.module.css';

const title = 'Default project';
const description = 'Default project description';

export const Default = () => {
  return (
    <Fragment>
      <Meta title={title} prefix="Projects" description={description} />
      <ProjectContainer className={styles.slice}>
        <ProjectBackground
          src={sliceBackground}
          srcSet={`${sliceBackground.src} 1280w, ${sliceBackgroundLarge.src} 2560w`}
          placeholder={sliceBackgroundPlaceholder}
          opacity={0.8}
        />
        <ProjectHeader title={title} description={description} />
      </ProjectContainer>
      <Footer />
    </Fragment>
  );
};
