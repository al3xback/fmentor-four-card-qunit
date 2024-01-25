import jsdom from 'jsdom';
import axios from 'axios';

const { JSDOM } = jsdom;
const { test } = QUnit;

const url = 'https://al3xback.github.io/fmentor-four-card-qunit/';

const getData = () => {
	return axios
		.get(url)
		.then((res) => {
			const { document } = new JSDOM(res.data).window;
			return document;
		})
		.catch((err) => {
			throw new Error(err);
		});
};

QUnit.module('DOM', (hooks) => {
	hooks.beforeEach(async () => {
		try {
			const document = await getData();
			global.document = document;
		} catch (err) {
			console.log(err);
		}
	});

	test("should have a title element with a class of 'card'", (assert) => {
		const sectionHeadEl = document.querySelector('.section__head');
		const cardsSummaryTitleEl = sectionHeadEl.querySelector(
			'.cards-summary__title'
		);

		assert.ok(cardsSummaryTitleEl);
	});

	test("should have a subtitle element with a class of 'section__subtitle'", (assert) => {
		const sectionHeadEl = document.querySelector('.section__head');
		const cardsSummarySubtitleEl = sectionHeadEl.querySelector(
			'.cards-summary__subtitle'
		);

		assert.ok(cardsSummarySubtitleEl);
	});

	test("should have a description element with a class of 'section__desc'", (assert) => {
		const sectionHeadEl = document.querySelector('.section__head');
		const cardsSummaryDescEl = sectionHeadEl.querySelector(
			'.cards-summary__desc'
		);

		assert.ok(cardsSummaryDescEl);
	});

	test('should have four card list item elements', (assert) => {
		const cardListItemEls = document.querySelectorAll('.card');

		assert.strictEqual(cardListItemEls.length, 4);
	});
});
