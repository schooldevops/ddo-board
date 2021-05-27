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

describe('Comment e2e test', () => {
  let startingEntitiesCount = 0;

  before(() => {
    cy.window().then(win => {
      win.sessionStorage.clear();
    });

    cy.clearCookies();
    cy.intercept('GET', '/api/comments*').as('entitiesRequest');
    cy.visit('');
    cy.login('admin', 'admin');
    cy.clickOnEntityMenuItem('comment');
    cy.wait('@entitiesRequest').then(({ request, response }) => (startingEntitiesCount = response.body.length));
    cy.visit('/');
  });

  it('should load Comments', () => {
    cy.intercept('GET', '/api/comments*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('comment');
    cy.wait('@entitiesRequest');
    cy.getEntityHeading('Comment').should('exist');
    if (startingEntitiesCount === 0) {
      cy.get(entityTableSelector).should('not.exist');
    } else {
      cy.get(entityTableSelector).should('have.lengthOf', startingEntitiesCount);
    }
    cy.visit('/');
  });

  it('should load details Comment page', () => {
    cy.intercept('GET', '/api/comments*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('comment');
    cy.wait('@entitiesRequest');
    if (startingEntitiesCount > 0) {
      cy.get(entityDetailsButtonSelector).first().click({ force: true });
      cy.getEntityDetailsHeading('comment');
      cy.get(entityDetailsBackButtonSelector).should('exist');
    }
    cy.visit('/');
  });

  it('should load create Comment page', () => {
    cy.intercept('GET', '/api/comments*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('comment');
    cy.wait('@entitiesRequest');
    cy.get(entityCreateButtonSelector).click({ force: true });
    cy.getEntityCreateUpdateHeading('Comment');
    cy.get(entityCreateSaveButtonSelector).should('exist');
    cy.visit('/');
  });

  it('should load edit Comment page', () => {
    cy.intercept('GET', '/api/comments*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('comment');
    cy.wait('@entitiesRequest');
    if (startingEntitiesCount > 0) {
      cy.get(entityEditButtonSelector).first().click({ force: true });
      cy.getEntityCreateUpdateHeading('Comment');
      cy.get(entityCreateSaveButtonSelector).should('exist');
    }
    cy.visit('/');
  });

  it('should create an instance of Comment', () => {
    cy.intercept('GET', '/api/comments*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('comment');
    cy.wait('@entitiesRequest').then(({ request, response }) => (startingEntitiesCount = response.body.length));
    cy.get(entityCreateButtonSelector).click({ force: true });
    cy.getEntityCreateUpdateHeading('Comment');

    cy.get(`[data-cy="depth"]`).type('47734').should('have.value', '47734');

    cy.get(`[data-cy="comment"]`)
      .type('multi-byte driver heuristic', { force: true })
      .invoke('val')
      .should('match', new RegExp('multi-byte driver heuristic'));

    cy.get(`[data-cy="readCnt"]`).type('65684').should('have.value', '65684');

    cy.get(`[data-cy="goodCnt"]`).type('53028').should('have.value', '53028');

    cy.get(`[data-cy="badCnt"]`).type('36534').should('have.value', '36534');

    cy.get(`[data-cy="createdAt"]`).type('2021-05-27T01:56').invoke('val').should('equal', '2021-05-27T01:56');

    cy.get(`[data-cy="createdBy"]`).type('44122').should('have.value', '44122');

    cy.get(`[data-cy="modifiedAt"]`).type('2021-05-26T06:11').invoke('val').should('equal', '2021-05-26T06:11');

    cy.get(`[data-cy="modifiedBy"]`).type('13608').should('have.value', '13608');

    cy.setFieldSelectToLastOfEntity('post');

    cy.setFieldSelectToLastOfEntity('parent');

    cy.get(entityCreateSaveButtonSelector).click({ force: true });
    cy.scrollTo('top', { ensureScrollable: false });
    cy.get(entityCreateSaveButtonSelector).should('not.exist');
    cy.intercept('GET', '/api/comments*').as('entitiesRequestAfterCreate');
    cy.visit('/');
    cy.clickOnEntityMenuItem('comment');
    cy.wait('@entitiesRequestAfterCreate');
    cy.get(entityTableSelector).should('have.lengthOf', startingEntitiesCount + 1);
    cy.visit('/');
  });

  it('should delete last instance of Comment', () => {
    cy.intercept('GET', '/api/comments*').as('entitiesRequest');
    cy.intercept('DELETE', '/api/comments/*').as('deleteEntityRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('comment');
    cy.wait('@entitiesRequest').then(({ request, response }) => {
      startingEntitiesCount = response.body.length;
      if (startingEntitiesCount > 0) {
        cy.get(entityTableSelector).should('have.lengthOf', startingEntitiesCount);
        cy.get(entityDeleteButtonSelector).last().click({ force: true });
        cy.getEntityDeleteDialogHeading('comment').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click({ force: true });
        cy.wait('@deleteEntityRequest');
        cy.intercept('GET', '/api/comments*').as('entitiesRequestAfterDelete');
        cy.visit('/');
        cy.clickOnEntityMenuItem('comment');
        cy.wait('@entitiesRequestAfterDelete');
        cy.get(entityTableSelector).should('have.lengthOf', startingEntitiesCount - 1);
      }
      cy.visit('/');
    });
  });
});
