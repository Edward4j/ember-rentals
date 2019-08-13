import { module, test } from 'qunit';
import { click, visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
//import {
//  click,
//  currentUrl,
//  visit
//} from '@ember/test-helpers';

module('Acceptance | list rentals', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('should show rentals as the home page', async function (assert) {
    await visit('/');
    assert.equal(currentURL(), '/rentals', 'should redirect automatically');
  });

  test('should link to information about the company.', async function (assert) {
    await visit('/');
    await click(".menu-about");
    assert.equal(currentUrl(), '/about', 'should navigate to about');
  });

  test('should link to contact information.', async function (assert) {
    await visit('/');
    await click(".menu-contact");
    assert.equal(currentUrl(), '/contact', 'should navigate to contact');
  });

  test('should list available rentals.', async function (assert) {
    await visit('/');
    assert.equal(this.element.querySelectorAll('.listing').length, 3, 'should display 3 listings');
  });

  test('should filter the list of rentals by city.', async function (assert) {
  });

  test('should show details for a selected rental', async function (assert) {
  });


  //test('visiting /list-rentals', async function(assert) {
  //  await visit('/list-rentals');
  //
  //  assert.equal(currentURL(), '/list-rentals');
  //});

  //test('visiting /', async function(assert) {
  //  await visit('/');
  //
  //  assert.equal(currentURL(), '/');
  //});
});
