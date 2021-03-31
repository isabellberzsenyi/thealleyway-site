import {
  getAuthorTestimonies,
  getFrequentlyAnsweredQuestions,
  getStoryInquiryPage,
  getNavigation,
  getFooter,
} from '../lib/api';
import AuthorTestimony from '../components/authorTestimony/AuthorTestimony';
import QuestionAnswer from '../components/questionAnswer/QuestionAnswer';
import Navigation from '../components/navigation/Navigation';
import Footer from '../components/footer/Footer';
import { H1, H2, H3, P } from '../style/typography';
import { getString } from '../lib/richText';
import StorySubmissionConfirmation from '../components/storySubmissionConfirmation/StorySubmissionConfirmation';

export default function StoryInquiryPage({
  storyInquiryPageData,
  authorTestimonies,
  questionsAndAnswers,
  navigationData,
  footerData,
}) {
  const {
    story_submission_title: storySubmissionTitle,
    story_submission_description: storySubmissionDescription,
    submission_form_subtitle: submissionFormSubtitle,
    author_information_subtitle: authorInformationSubtitle,
    author_signature_subtitle: authorSignatureSubtitle,
    author_signature_description: authorSignatureDescription,
    social_information_subtitle: socialInformationSubtitle,
    venmo_more_info_subtitle: venmoMoreInfoSubtitle,
    venmo_more_info_description: venmoMoreInfoDescription,
    story_concept_subtitle: storyConceptSubtitle,
    story_concept_description: storyConceptDescription,
    resource_links_subtitle: resourceLinksSubtitle,
    resource_links_description: resourceLinksDescription,
    faq_title: faqTitle,
    story_submission_confirmation_title: storySubmissionConfirmationTitle,
    story_submission_confirmation_description: storySubmissionConfirmationDescription,
  } = storyInquiryPageData;

  return (
    <>
      <Navigation navigationData={navigationData} />

      <H1>{getString(storySubmissionTitle)}</H1>
      <P>{getString(storySubmissionDescription)}</P>
      <H2>{getString(submissionFormSubtitle)}</H2>
      <H3>{getString(authorInformationSubtitle)}</H3>
      <H3>{getString(authorSignatureSubtitle)}</H3>
      <P>{getString(authorSignatureDescription)}</P>
      <H3>{getString(socialInformationSubtitle)}</H3>
      <H3>{getString(venmoMoreInfoSubtitle)}</H3>
      <P>{getString(venmoMoreInfoDescription)}</P>
      <H3>{getString(storyConceptSubtitle)}</H3>
      <P>{getString(storyConceptDescription)}</P>
      <H3>{getString(resourceLinksSubtitle)}</H3>
      <P>{getString(resourceLinksDescription)}</P>

      <H2 h2Data={faqTitle} />

      {questionsAndAnswers.map((item) => {
        return <QuestionAnswer key={item.id} questionAnswerData={item} />;
      })}
      {authorTestimonies.map((item) => {
        return (
          <AuthorTestimony
            key={item.author_info.id}
            authorTestimonyData={item}
          />
        );
      })}

      <StorySubmissionConfirmation
        title={storySubmissionConfirmationTitle}
        description={storySubmissionConfirmationDescription}
      />
      <Footer footerData={footerData} />
    </>
  );
}

export async function getStaticProps() {
  const storyInquiryPageData = await getStoryInquiryPage();
  const authorTestimoniesIds = storyInquiryPageData.author_testimonies.map(
    (item) => {
      return item.author_testimony.id;
    },
  );
  const authorTestimonies = await getAuthorTestimonies(authorTestimoniesIds);

  const faqsIds = storyInquiryPageData.questions_and_answers.map((item) => {
    return item.question_and_answer.id;
  });
  const questionsAndAnswers = await getFrequentlyAnsweredQuestions(faqsIds);
  const footerData = await getFooter();
  const navigationData = await getNavigation();

  return {
    props: {
      storyInquiryPageData,
      authorTestimonies,
      questionsAndAnswers,
      footerData,
      navigationData,
    },
  };
}
