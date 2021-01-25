import {OnlyBrowserPageProps} from '@/layouts/core/types/OnlyBrowserPageProps';
import DefaultLayout from '@/layouts/default/components/DefaultLayout';
import {getDefaultServerSideProps} from '@/layouts/default/defaultSSR';
import useI18n, { I18n } from '@/modules/core/i18n/hooks/useI18n';
import Products from '@/common/components/dataDisplay/Products';
import useCustomer from '@/modules/core/data/hooks/useCustomer';
import {SSGPageProps} from '@/layouts/core/types/SSGPageProps';
import {SSRPageProps} from '@/layouts/core/types/SSRPageProps';
import {Customer} from '@/modules/core/data/types/Customer';
import {createLogger} from '@unly/utils-simple-logger';
import {GetServerSideProps, NextPage} from 'next';
import {useTranslation} from 'react-i18next';
import {css} from '@emotion/react';
import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/router';

const fileLabel = 'pages/[locale]/chatbot';
const logger = createLogger({ // eslint-disable-line no-unused-vars,@typescript-eslint/no-unused-vars
  label: fileLabel,
});

const formatter = new Intl.NumberFormat('fr-FR', {
  style: 'currency',
  currency: 'EUR'
});

type CustomPageProps = {}
type GetServerSidePageProps = CustomPageProps & SSRPageProps
type Props = CustomPageProps & (SSRPageProps & SSGPageProps<OnlyBrowserPageProps>);
export const getServerSideProps: GetServerSideProps<GetServerSidePageProps> = getDefaultServerSideProps;

const ProductsPage: NextPage<Props> = (props): JSX.Element => {
  const router = useRouter();
  const gender = router.query.gender as string;

  if (gender !== 'men' && gender !== 'women') {
    router.push('/');
  }

  const customer: Customer = useCustomer();
  const products = customer?.products;
  const {locale}: I18n = useI18n();
  const {t} = useTranslation();

  return (
    <DefaultLayout {...props} pageName={'products'} headProps={{
      seoTitle: t('nrn.pages.products', gender === 'MEN' ? 'Hommes' : 'Femmes')
    }}>
      <Products products={products.filter(p => p.gender === gender.toUpperCase())}/>
    </DefaultLayout>
  );
};

export default (ProductsPage);
