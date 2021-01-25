import {AirtableRecord} from '@/modules/core/data/types/AirtableRecord';
import {Product} from '@/modules/core/data/types/Product';
import {Container, Col, Row} from 'reactstrap';
import ProductCard from './ProductCard';
import {css} from '@emotion/react';
import map from 'lodash.map';
import React from 'react';

type Props = {
  products: AirtableRecord<Product>[];
}

const Products: React.FunctionComponent<Props> = ({products}) => (
  <Container>
    <Row>
    {
      map(products, (product: AirtableRecord<Product>, i: number) => 
        <Col key={i} sm={12} md={6} lg={4}>
          <ProductCard key={i} product={product}/>
        </Col>
      )
    }
    </Row>
  </Container>
)

export default Products;
