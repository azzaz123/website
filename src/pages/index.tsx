import React, {FC, useState} from 'react';
import {AllContributors} from '../components/AllContributors';
import {Contributor} from '../components/Contributor';
import {Faq} from '../components/Faq';
import {Hr} from '../components/Hr';
import {TextInput} from '../components/input/TextInput';
import {Nav} from '../components/Nav';
import {Anchor, Props as AnchorProps} from '../components/typography/Anchor';
import {Footer} from '../components/typography/Footer';
import {RandomizedText} from '../components/typography/RandomizedText';
import {Text} from '../components/typography/Text';
import {navItems} from '../nav';
import {Home as SectionIds} from '../sectionIds';
import styles from './index.module.scss';

const Header = () => (
	<header>
		<Nav>{navItems}</Nav>

		<div className={styles.title}>
			<Text as='small' className={styles.caption}>
				The
			</Text>
		</div>
		<Text as='h1' className={styles.heading}>
			Zero Width Shortener
		</Text>
	</header>
);

const Shorten = () => {
	const [longUrl, setLongUrl] = useState<string>();

	return (
		<main id={SectionIds.Shorten} className={styles.content}>
			<Text>
				Shorten your URLs with invisible spaces today. There's no more need for ugly <RandomizedText /> endings.
			</Text>
			<TextInput
				inputProps={{
					placeholder: 'https://en.wikipedia.org/wiki/Galactic_algorithm',
					type: 'url',
					autoFocus: true,
					value: longUrl,
					onChange: event => setLongUrl(event.target.value)
				}}
				buttonProps={{children: 'Shorten'}}
				onSubmit={event => {
					event.preventDefault();
					console.log({longUrl});
					alert(longUrl);
				}}
			/>
		</main>
	);
};

const FrequentlyAskedQuestions = () => (
	<section id={SectionIds.Faq} className={styles.content}>
		<Text centered as='h2'>
			Frequently Asked Questions
		</Text>
		<Hr />
		{/*
      TODO: Should this be refactored to use children elements, something like:
      <Faq>
        <Faq.Item title='Title 1'>Description 1</FaqItem>
        <Faq.Item title='Title 2'>Description 2</FaqItem>
        <Faq.Item title='Title 3'>Description 3</FaqItem>
      </Faq>
  */}
		<Faq
			faq={[
				{key: 'howItWorks', title: 'How does this tool work?', body: 'how it works '.repeat(10).trim()},
				{
					key: 'platformIssues',
					title: 'Why can I see some characters at the end of the link?',
					body: 'you probably have a stupid phone '.repeat(10).trim()
				},
				{key: 'brokenChatService', title: 'Why doesnt zws work on [chat service]?', body: 'broken chat service haha '.repeat(10).trim()}
			]}
		/>
	</section>
);

const AboutUs = () => (
	<section id={SectionIds.AboutUs} className={styles.content}>
		<div className={styles['about-us-text']}>
			<Text as='h2'>About us</Text>

			<Text>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ipsum nunc aliquet bibendum
				enim facilisis gravida neque convallis. Adipiscing at in tellus integer feugiat. Ultrices tincidunt arcu non sodales neque sodales. Quisque sagittis
				purus sit amet volutpat consequat mauris nunc. A pellentesque sit amet porttitor eget dolor. Tempor orci dapibus ultrices in iaculis nunc. At auctor
				urna nunc id cursus metus aliquam.
			</Text>
		</div>

		<AllContributors>
			{(props: AnchorProps) => (
				<Anchor href='https://jonah.pw/?utm_source=zws.im' {...props}>
					<Contributor src='https://avatars3.githubusercontent.com/u/7608555?s=256' alt='A fox made out of a pepperoni pizza' />
				</Anchor>
			)}
			{(props: AnchorProps) => (
				<Anchor href='https://overcoder.dev/?utm_source=zws.im' {...props}>
					<Contributor
						src='https://avatars3.githubusercontent.com/u/8523135?s=256'
						alt='Poorly scribbled white text on a black background saying "Overcoder"'
					/>
				</Anchor>
			)}
		</AllContributors>
	</section>
);

const Home: FC = () => (
	<>
		<Header />

		<Shorten />

		<FrequentlyAskedQuestions />

		<AboutUs />

		<Footer id={SectionIds.Footer}>
			<Text>
				ZWS and zws.im are licensed under the <Anchor href='https://www.apache.org/licenses/LICENSE-2.0'>Apache 2.0 license</Anchor>{' '}
			</Text>
		</Footer>
	</>
);

export default Home;