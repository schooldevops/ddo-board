import {
  entityTableSelector,
  entityDetailsButtonSelector,
  entityDetailsBackButtonSelector,
  entityCreateButtonSelector,
  entityCreateSaveButtonSelector,
  entityEditButtonSelector,
  entityDeleteButtonSelector,
  entityConfirmDeleteButtonSelector,
} from '../../support/entity';

describe('Attach e2e test', () => {
  let startingEntitiesCount = 0;

  before(() => {
    cy.window().then(win => {
      win.sessionStorage.clear();
    });

    cy.clearCookies();
    cy.intercept('GET', '/api/attaches*').as('entitiesRequest');
    cy.visit('');
    cy.login('admin', 'admin');
    cy.clickOnEntityMenuItem('attach');
    cy.wait('@entitiesRequest').then(({ request, response }) => (startingEntitiesCount = response.body.length));
    cy.visit('/');
  });

  it('should load Attaches', () => {
    cy.intercept('GET', '/api/attaches*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('attach');
    cy.wait('@entitiesRequest');
    cy.getEntityHeading('Attach').should('exist');
    if (startingEntitiesCount === 0) {
      cy.get(entityTableSelector).should('not.exist');
    } else {
      cy.get(entityTableSelector).should('have.lengthOf', startingEntitiesCount);
    }
    cy.visit('/');
  });

  it('should load details Attach page', () => {
    cy.intercept('GET', '/api/attaches*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('attach');
    cy.wait('@entitiesRequest');
    if (startingEntitiesCount > 0) {
      cy.get(entityDetailsButtonSelector).first().click({ force: true });
      cy.getEntityDetailsHeading('attach');
      cy.get(entityDetailsBackButtonSelector).should('exist');
    }
    cy.visit('/');
  });

  it('should load create Attach page', () => {
    cy.intercept('GET', '/api/attaches*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('attach');
    cy.wait('@entitiesRequest');
    cy.get(entityCreateButtonSelector).click({ force: true });
    cy.getEntityCreateUpdateHeading('Attach');
    cy.get(entityCreateSaveButtonSelector).should('exist');
    cy.visit('/');
  });

  it('should load edit Attach page', () => {
    cy.intercept('GET', '/api/attaches*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('attach');
    cy.wait('@entitiesRequest');
    if (startingEntitiesCount > 0) {
      cy.get(entityEditButtonSelector).first().click({ force: true });
      cy.getEntityCreateUpdateHeading('Attach');
      cy.get(entityCreateSaveButtonSelector).should('exist');
    }
    cy.visit('/');
  });

  it('should create an instance of Attach', () => {
    cy.intercept('GET', '/api/attaches*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('attach');
    cy.wait('@entitiesRequest').then(({ request, response }) => (startingEntitiesCount = response.body.length));
    cy.get(entityCreateButtonSelector).click({ force: true });
    cy.getEntityCreateUpdateHeading('Attach');

    cy.get(`[data-cy="ord"]`).type('51795').should('have.value', '51795');

    cy.get(`[data-cy="name"]`).type('overriding', { force: true }).invoke('val').should('match', new RegExp('overriding'));

    cy.get(`[data-cy="origName"]`)
      .type('Mandatory Persistent e-markets', { force: true })
      .invoke('val')
      .should('match', new RegExp('Mandatory Persistent e-markets'));

    cy.get(`[data-cy="ext"]`)
      .type('orchestration bypass', { force: true })
      .invoke('val')
      .should('match', new RegExp('orchestration bypass'));

    cy.get(`[data-cy="contentType"]`)
      .type('면 fresh-thinking Soap', { force: true })
      .invoke('val')
      .should('match', new RegExp('면 fresh-thinking Soap'));

    cy.get(`[data-cy="path"]`).type('CSS program 인천', { force: true }).invoke('val').should('match', new RegExp('CSS program 인천'));

    cy.get(`[data-cy="fileSize"]`).type('26044').should('have.value', '26044');

    cy.get(`[data-cy="createdAt"]`).type('2021-05-26T23:17').invoke('val').should('equal', '2021-05-26T23:17');

    cy.get(`[data-cy="createdBy"]`).type('16266').should('have.value', '16266');

    cy.get(`[data-cy="modifiedAt"]`).type('2021-05-26T13:24').invoke('val').should('equal', '2021-05-26T13:24');

    cy.get(`[data-cy="modifiedBy"]`).type('50123').should('have.value', '50123');

    cy.setFieldSelectToLastOfEntity('attachGroup');

    cy.get(entityCreateSaveButtonSelector).click({ force: true });
    cy.scrollTo('top', { ensureScrollable: false });
    cy.get(entityCreateSaveButtonSelector).should('not.exist');
    cy.intercept('GET', '/api/attaches*').as('entitiesRequestAfterCreate');
    cy.visit('/');
    cy.clickOnEntityMenuItem('attach');
    cy.wait('@entitiesRequestAfterCreate');
    cy.get(entityTableSelector).should('have.lengthOf', startingEntitiesCount + 1);
    cy.visit('/');
  });

  it('should delete last instance of Attach', () => {
    cy.intercept('GET', '/api/attaches*').as('entitiesRequest');
    cy.intercept('DELETE', '/api/attaches/*').as('deleteEntityRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('attach');
    cy.wait('@entitiesRequest').then(({ request, response }) => {
      startingEntitiesCount = response.body.length;
      if (startingEntitiesCount > 0) {
        cy.get(entityTableSelector).should('have.lengthOf', startingEntitiesCount);
        cy.get(entityDeleteButtonSelector).last().click({ force: true });
        cy.getEntityDeleteDialogHeading('attach').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click({ force: true });
        cy.wait('@deleteEntityRequest');
        cy.intercept('GET', '/api/attaches*').as('entitiesRequestAfterDelete');
        cy.visit('/');
        cy.clickOnEntityMenuItem('attach');
        cy.wait('@entitiesRequestAfterDelete');
        cy.get(entityTableSelector).should('have.lengthOf', startingEntitiesCount - 1);
      }
      cy.visit('/');
    });
  });
});
