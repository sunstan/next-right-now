import AirtableAsset from '@/modules/core/airtable/components/AirtableAsset';
import useI18n, { I18n } from '@/modules/core/i18n/hooks/useI18n';
import { Product } from '@/modules/core/data/types/Product';
import { Asset } from '@/modules/core/data/types/Asset';
import { css } from '@emotion/react';
import Markdown from './Markdown';
import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/router';

type Props = {
  product: Product;
}

const formatter = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR'
  });

const ProductCard: React.FunctionComponent<Props> = (props) => {
  const {product} = props;
  const {locale}: I18n = useI18n();
  const {gender} = useRouter().query;
  const image: Asset = product?.images?.[0];

  return (
    <Link href={`/${locale}/${gender}/${product.slug}/${product.ref}`}>
        <div
            key={product?.ref}
            css={css`
                box-shadow: 0 2px 4px rgba(0,0,0,.2);
                background-color: white;
                margin-bottom: 30px;
                border-radius: 4px;
                transition: 200ms;
                cursor: pointer;

                &:hover {
                    box-shadow: 0 6px 10px rgba(0,0,0,.15);
                }

                img {
                    margin-top: 30px;
                }

                .card-body {
                    width: 100%;
                    flex-grow: 1;
                    padding: 30px;

                    p {
                        position:relative;
                        width: 100%;
                        height: 4.3em;
                        overflow: hidden;
                        display: -webkit-box;
                        -webkit-line-clamp: 3;
                        -webkit-box-orient: vertical;
                    }
                }
            `}
        >
            <AirtableAsset
                key={image?.id}
                id={image?.id}
                asset={image}
                transformationsOverride={{
                    height: 200,
                }}
            />
            <div className={'card-body'}>
                <h4 className="text-primary">{formatter.format(product.price)}</h4>
                <h3>{product.title}</h3>
                <p>{product.description}</p>
            </div>
        </div>
    </Link>
  );
};

export default ProductCard;
