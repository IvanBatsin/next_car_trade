import React from 'react';
import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {PaginationRenderItemParams} from '@material-ui/lab';
import { ParsedUrlQuery, stringify } from 'querystring';
import { getAsString } from '../utils/toString';

interface CarsPaginationProps {
  totalPages: number
}

export const CarsPagination: React.FC<CarsPaginationProps> = ({totalPages}: CarsPaginationProps): React.ReactElement => {
  const router = useRouter();
  return (
    <Pagination
      page={parseInt(getAsString(router.query.page) || '1')}
      count={totalPages}
      renderItem={(item) => (
        <PaginationItem
          component={MaterialUILink}
          query={router.query}
          item={item}
          {...item}

        />
      )}
    />
  )
}

interface MaterialUILinkProps{
  item: PaginationRenderItemParams,
  query: ParsedUrlQuery
} 

const MaterialUILink = React.forwardRef<HTMLAnchorElement, MaterialUILinkProps>(({item, query, ...props}, ref) => (
  <Link href={{
    pathname: 'cars',
    query: {...query, page: item.page}
  }} shallow>
    <a ref={ref} {...props}></a>
  </Link>
));