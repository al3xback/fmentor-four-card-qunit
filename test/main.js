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
	hooks.beforeEach(async (assert) => {
		try {
			const document = await getData();
			global.document = document;
		} catch (err) {
			console.log(err);
		}
	});

	test("should have a title element with a class of 'card'", (assert) => {
		const sectionHeadEl = document.querySelector('.section__head');
		const sectionTitleEl = sectionHeadEl.querySelector('.section__title');

		assert.ok(sectionTitleEl);
	});

	test("should have a subtitle element with a class of 'section__subtitle'", (assert) => {
		const sectionHeadEl = document.querySelector('.section__head');
		const sectionSubtitleEl =
			sectionHeadEl.querySelector('.section__subtitle');

		assert.ok(sectionSubtitleEl);
	});

	test("should have a description element with a class of 'section__desc'", (assert) => {
		const sectionHeadEl = document.querySelector('.section__head');
		const sectionDescEl = sectionHeadEl.querySelector('.section__desc');

		assert.ok(sectionDescEl);
	});

	test('should have four card list item elements', (assert) => {
		const cardListItemEls = document.querySelectorAll('.card__list-item');

		assert.strictEqual(cardListItemEls.length, 4);
	});
});
