import {OnlyBrowserPageProps} from '@/layouts/core/types/OnlyBrowserPageProps';
import AirtableAsset from '@/modules/core/airtable/components/AirtableAsset';
import CheckoutForm from '@/common/components/dataDisplay/CheckOutForm';
import {getDefaultServerSideProps} from '@/layouts/default/defaultSSR';
import DefaultLayout from '@/layouts/default/components/DefaultLayout';
import useI18n, {I18n} from '@/modules/core/i18n/hooks/useI18n';
import useCustomer from '@/modules/core/data/hooks/useCustomer';
import {SSGPageProps} from '@/layouts/core/types/SSGPageProps';
import {SSRPageProps} from '@/layouts/core/types/SSRPageProps';
import {Product} from '@/modules/core/data/types/Product';
import {createLogger} from '@unly/utils-simple-logger';
import {Asset} from '@/modules/core/data/types/Asset';
import {GetServerSideProps, NextPage} from 'next';
import {loadStripe} from '@stripe/stripe-js/pure';
import getStripe from '@/common/utils/get-stripe';
import {Elements} from '@stripe/react-stripe-js';
import {useTranslation} from 'react-i18next';
import {useRouter} from 'next/router';
import {css} from '@emotion/react';
import React from 'react';
import { Col, Container, Row } from 'reactstrap';


const fileLabel = 'pages/[locale]/product';
const logger = createLogger({ // eslint-disable-line no-unused-vars,@typescript-eslint/no-unused-vars
  label: fileLabel,
});

type CustomPageProps = {}
type GetServerSidePageProps = CustomPageProps & SSRPageProps
type Props = CustomPageProps & (SSRPageProps & SSGPageProps<OnlyBrowserPageProps>);
export const getServerSideProps: GetServerSideProps<GetServerSidePageProps> = getDefaultServerSideProps;

const ProductPage: NextPage<Props> = (props): JSX.Element => {

    const stripe = getStripe();
    const router = useRouter()
    const {ref} = router.query;
    const {t} = useTranslation();
    const {locale}: I18n = useI18n();
    const {products} = useCustomer();
    const product = products?.find((p: Product) => p.ref === ref);
    const image: Asset = product?.images?.[0];

    const formatter = new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR'
    });

    if (!product) console.log('error');
    return (
        <DefaultLayout {...props} pageName={'products'} headProps={{
            seoTitle: t('nrn.pages.product', 'Produit')
        }}>
            {product && <Container 
                css={css`
                    overflow: hidden;
                    border-radius: 4px;
                    background-color: white;
                    box-shadow: 0 2px 4px rgba(0,0,0,.2);

                    .card-image {
                        margin: 40px;
                        display: flex;
                        align-items: center;
                        justify-content: center;

                        img {
                            height: 400px;
                        }
                    }
                    
                    .card-body {
                        padding: 40px;
                        display: flex;
                        align-items: flex-start;
                        flex-direction: column;
                        justify-content: space-between;

                        p {
                            flex-grow: 1;
                            text-align:left;
                        }
                    }
                    
                `}
            >   
                <Row>
                    <Col sm={12} md={4}>
                        <div className={'card-image'}>
                            <AirtableAsset
                                key={image?.id}
                                id={image?.id}
                                asset={image}
                            />
                        </div>
                    </Col>
                    <Col sm={12} md={8}>
                        <div className={'card-body'}>
                            <h3 className='text-primary'>{formatter.format(product.price)}</h3>
                            <h1>{product.title}</h1>
                            <p>{product.description}</p>

                            <Elements stripe={stripe}>
                                <CheckoutForm product={product}/>
                            </Elements>
                        </div>
                    </Col>
                </Row>
                
            </Container>}
        </DefaultLayout>
    );
}

export default (ProductPage);
