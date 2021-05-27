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

describe('Board e2e test', () => {
  let startingEntitiesCount = 0;

  before(() => {
    cy.window().then(win => {
      win.sessionStorage.clear();
    });

    cy.clearCookies();
    cy.intercept('GET', '/api/boards*').as('entitiesRequest');
    cy.visit('');
    cy.login('admin', 'admin');
    cy.clickOnEntityMenuItem('board');
    cy.wait('@entitiesRequest').then(({ request, response }) => (startingEntitiesCount = response.body.length));
    cy.visit('/');
  });

  it('should load Boards', () => {
    cy.intercept('GET', '/api/boards*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('board');
    cy.wait('@entitiesRequest');
    cy.getEntityHeading('Board').should('exist');
    if (startingEntitiesCount === 0) {
      cy.get(entityTableSelector).should('not.exist');
    } else {
      cy.get(entityTableSelector).should('have.lengthOf', startingEntitiesCount);
    }
    cy.visit('/');
  });

  it('should load details Board page', () => {
    cy.intercept('GET', '/api/boards*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('board');
    cy.wait('@entitiesRequest');
    if (startingEntitiesCount > 0) {
      cy.get(entityDetailsButtonSelector).first().click({ force: true });
      cy.getEntityDetailsHeading('board');
      cy.get(entityDetailsBackButtonSelector).should('exist');
    }
    cy.visit('/');
  });

  it('should load create Board page', () => {
    cy.intercept('GET', '/api/boards*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('board');
    cy.wait('@entitiesRequest');
    cy.get(entityCreateButtonSelector).click({ force: true });
    cy.getEntityCreateUpdateHeading('Board');
    cy.get(entityCreateSaveButtonSelector).should('exist');
    cy.visit('/');
  });

  it('should load edit Board page', () => {
    cy.intercept('GET', '/api/boards*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('board');
    cy.wait('@entitiesRequest');
    if (startingEntitiesCount > 0) {
      cy.get(entityEditButtonSelector).first().click({ force: true });
      cy.getEntityCreateUpdateHeading('Board');
      cy.get(entityCreateSaveButtonSelector).should('exist');
    }
    cy.visit('/');
  });

  it('should create an instance of Board', () => {
    cy.intercept('GET', '/api/boards*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('board');
    cy.wait('@entitiesRequest').then(({ request, response }) => (startingEntitiesCount = response.body.length));
    cy.get(entityCreateButtonSelector).click({ force: true });
    cy.getEntityCreateUpdateHeading('Board');

    cy.get(`[data-cy="title"]`).type('edge Rubber', { force: true }).invoke('val').should('match', new RegExp('edge Rubber'));

    cy.get(`[data-cy="category"]`).type('Sausages', { force: true }).invoke('val').should('match', new RegExp('Sausages'));

    cy.get(`[data-cy="createdAt"]`).type('2021-05-26T06:36').invoke('val').should('equal', '2021-05-26T06:36');

    cy.get(`[data-cy="createdBy"]`).type('70192').should('have.value', '70192');

    cy.get(`[data-cy="modifiedAt"]`).type('2021-05-26T03:00').invoke('val').should('equal', '2021-05-26T03:00');

    cy.get(`[data-cy="modifiedBy"]`).type('93742').should('have.value', '93742');

    cy.get(entityCreateSaveButtonSelector).click({ force: true });
    cy.scrollTo('top', { ensureScrollable: false });
    cy.get(entityCreateSaveButtonSelector).should('not.exist');
    cy.intercept('GET', '/api/boards*').as('entitiesRequestAfterCreate');
    cy.visit('/');
    cy.clickOnEntityMenuItem('board');
    cy.wait('@entitiesRequestAfterCreate');
    cy.get(entityTableSelector).should('have.lengthOf', startingEntitiesCount + 1);
    cy.visit('/');
  });

  it('should delete last instance of Board', () => {
    cy.intercept('GET', '/api/boards*').as('entitiesRequest');
    cy.intercept('DELETE', '/api/boards/*').as('deleteEntityRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('board');
    cy.wait('@entitiesRequest').then(({ request, response }) => {
      startingEntitiesCount = response.body.length;
      if (startingEntitiesCount > 0) {
        cy.get(entityTableSelector).should('have.lengthOf', startingEntitiesCount);
        cy.get(entityDeleteButtonSelector).last().click({ force: true });
        cy.getEntityDeleteDialogHeading('board').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click({ force: true });
        cy.wait('@deleteEntityRequest');
        cy.intercept('GET', '/api/boards*').as('entitiesRequestAfterDelete');
        cy.visit('/');
        cy.clickOnEntityMenuItem('board');
        cy.wait('@entitiesRequestAfterDelete');
        cy.get(entityTableSelector).should('have.lengthOf', startingEntitiesCount - 1);
      }
      cy.visit('/');
    });
  });
});
