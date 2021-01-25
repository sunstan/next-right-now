import {getDefaultStaticPaths, getDefaultStaticProps} from '@/layouts/default/defaultSSG';
import {OnlyBrowserPageProps} from '@/layouts/core/types/OnlyBrowserPageProps';
import {CommonServerSideParams} from '@/app/types/CommonServerSideParams';
import DefaultLayout from '@/layouts/default/components/DefaultLayout';
import useCustomer from '@/modules/core/data/hooks/useCustomer';
import {SSGPageProps} from '@/layouts/core/types/SSGPageProps';
import {GetStaticPaths, GetStaticProps, NextPage} from 'next';
import {Customer} from '@/modules/core/data/types/Customer';
import {createLogger} from '@unly/utils-simple-logger';
import {Col, Container, Row} from 'reactstrap';
import {css} from '@emotion/react';
import Link from 'next/link';
import React from 'react';
import useI18n, { I18n } from '@/modules/core/i18n/hooks/useI18n';

const fileLabel = 'pages/[locale]';
const logger = createLogger({ // eslint-disable-line no-unused-vars,@typescript-eslint/no-unused-vars
  label: fileLabel,
});

export const getStaticPaths: GetStaticPaths<CommonServerSideParams> = getDefaultStaticPaths;
export const getStaticProps: GetStaticProps<SSGPageProps, CommonServerSideParams> = getDefaultStaticProps;
type Props = {} & SSGPageProps<Partial<OnlyBrowserPageProps>>;

const HomePage: NextPage<Props> = (props): JSX.Element => {
  const customer: Customer = useCustomer();
  const {locale}: I18n = useI18n();
  return (
    <DefaultLayout {...props} pageName={'Home'}>
      <Container
        css={css`
          .index-card {
            widht: 100%;
            height: 400px;
            display: flex;
            cursor: pointer;
            overflow: hidden;
            transition: 200ms;
            position: relative;
            border-radius: 4px;
            box-shadow: 0 2px 4px rgba(0,0,0,.2);

            &:hover {
              box-shadow: 0 6px 10px rgba(0,0,0,.15);
            }

            img {
              width: 100%;
              height: 100%;
              object-fit: cover;
              position: absolute;
            }
          }
        `}>

          <Row>

            <Col sm={12} md={6}>
              <Link href={`${locale}/men`}>
                <div className={'index-card'}>
                  <img src={'/static/images/men.jpg'} alt=""/>
                </div>
              </Link>
            </Col>
            
            <Col sm={12} md={6}>
              <Link href={`${locale}/women`}>
                <div className={'index-card'}>
                  <img src={'/static/images/women.jpg'} alt=""/>
                </div>
              </Link>
            </Col>

          </Row>
      </Container>
    </DefaultLayout>
  );
};

export default (HomePage);
