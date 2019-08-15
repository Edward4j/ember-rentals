import Service from '@ember/service';
import { module, test } from 'qunit';
//import { click, visit, currentURL, fillIn, triggerKeyEvent } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import {
  click,
  currentURL,
  visit,
  fillIn,
  triggerKeyEvent
} from '@ember/test-helpers'

let StubMapsService = Service.extend({
  getMapElement() {
    return Promise.resolve(document.createElement('div'));
  }
});

module('Acceptance | list rentals', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(function() {
    this.owner.register('service:map-element', StubMapsService);
  });

  test('should show rentals as the home page', async function (assert) {
    await visit('/');
    assert.equal(currentURL(), '/rentals', 'should redirect automatically');
  });

  test('should link to information about the company.', async function (assert) {
    await visit('/');
    await click(".menu-about");
    assert.equal(currentURL(), '/about', 'should navigate to about');
  });

  test('should link to contact information.', async function (assert) {
    await visit('/');
    await click(".menu-contact");
    assert.equal(currentURL(), '/contact', 'should navigate to contact');
  });

  test('should list available rentals.', async function (assert) {
    await visit('/');
    assert.equal(this.element.querySelectorAll('.listing').length, 3, 'should display 3 listings');
  });

  test('should filter the list of rentals by city.', async function (assert) {
    await visit('/');
    await fillIn('.list-filter input', 'seattle');
    await triggerKeyEvent('.list-filter input', 'keyup', 69);
    assert.equal(this.element.querySelectorAll('.results .listing').length, 1, 'should display 1 listing');
    assert.ok(this.element.querySelector('.listing .location').textContent.includes('Seattle'), 'should contain 1 listing with location Seattle');
  });

  test('should show details for a selected rental', async function (assert) {
    await visit('/');
    assert.equal(this.element.querySelectorAll('.details').length, 3, 'should display 3 details');
    assert.ok(this.element.querySelector('.detail.rental-id').textContent.includes('ID'), 'should contain 1 listing with ID');
    assert.ok(this.element.querySelector('.detail.owner').textContent.includes('Owner'), 'should contain 1 detail with owner');
    assert.ok(this.element.querySelector('.detail.type').textContent.includes('Type'), 'should contain 1 detail with type');
    assert.ok(this.element.querySelector('.detail.location').textContent.includes('Location'), 'should contain 1 detail with location');
    assert.ok(this.element.querySelector('.detail.bedrooms').textContent.includes('Number of bedrooms'), 'should contain 1 detail with bedrooms');

    //assert.equal(this.element.querySelector('.listing h3').textContent.trim(), 'test-title', 'Title: test-title');
    //assert.equal(this.element.querySelector('.listing .owner').textContent.trim(), 'Owner: test-owner', 'Owner: test-owner');
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
