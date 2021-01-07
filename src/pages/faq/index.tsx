import Accordion from '@material-ui/core/Accordion/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary/AccordionSummary';
import Typography from '@material-ui/core/Typography/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { GetStaticProps } from 'next';
import React from 'react';
import { IFAQ } from '../../../interfaces/IFAQ';
import { openDB } from '../../openDB';

interface FAQProps {
  faqs: IFAQ[]
}

const FAQ: React.FC<FAQProps> = ({faqs}: FAQProps): React.ReactElement => {
  return (
    <div>
      {faqs.map(faq => {
        return (
          <Accordion key={faq.id}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>{faq.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
              {faq.answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        )
      })}
    </div>
  )
}
export default FAQ;

export const getStaticProps: GetStaticProps<FAQProps> = async () => {
  const db = await openDB();
  const faqs = await db.all<IFAQ[]>('select * from FAQ order by createDate desc');
  return {
    props: {
      faqs
    }
  }
}