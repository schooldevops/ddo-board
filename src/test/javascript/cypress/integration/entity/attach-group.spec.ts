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

describe('AttachGroup e2e test', () => {
  let startingEntitiesCount = 0;

  before(() => {
    cy.window().then(win => {
      win.sessionStorage.clear();
    });

    cy.clearCookies();
    cy.intercept('GET', '/api/attach-groups*').as('entitiesRequest');
    cy.visit('');
    cy.login('admin', 'admin');
    cy.clickOnEntityMenuItem('attach-group');
    cy.wait('@entitiesRequest').then(({ request, response }) => (startingEntitiesCount = response.body.length));
    cy.visit('/');
  });

  it('should load AttachGroups', () => {
    cy.intercept('GET', '/api/attach-groups*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('attach-group');
    cy.wait('@entitiesRequest');
    cy.getEntityHeading('AttachGroup').should('exist');
    if (startingEntitiesCount === 0) {
      cy.get(entityTableSelector).should('not.exist');
    } else {
      cy.get(entityTableSelector).should('have.lengthOf', startingEntitiesCount);
    }
    cy.visit('/');
  });

  it('should load details AttachGroup page', () => {
    cy.intercept('GET', '/api/attach-groups*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('attach-group');
    cy.wait('@entitiesRequest');
    if (startingEntitiesCount > 0) {
      cy.get(entityDetailsButtonSelector).first().click({ force: true });
      cy.getEntityDetailsHeading('attachGroup');
      cy.get(entityDetailsBackButtonSelector).should('exist');
    }
    cy.visit('/');
  });

  it('should load create AttachGroup page', () => {
    cy.intercept('GET', '/api/attach-groups*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('attach-group');
    cy.wait('@entitiesRequest');
    cy.get(entityCreateButtonSelector).click({ force: true });
    cy.getEntityCreateUpdateHeading('AttachGroup');
    cy.get(entityCreateSaveButtonSelector).should('exist');
    cy.visit('/');
  });

  it('should load edit AttachGroup page', () => {
    cy.intercept('GET', '/api/attach-groups*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('attach-group');
    cy.wait('@entitiesRequest');
    if (startingEntitiesCount > 0) {
      cy.get(entityEditButtonSelector).first().click({ force: true });
      cy.getEntityCreateUpdateHeading('AttachGroup');
      cy.get(entityCreateSaveButtonSelector).should('exist');
    }
    cy.visit('/');
  });

  it('should create an instance of AttachGroup', () => {
    cy.intercept('GET', '/api/attach-groups*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('attach-group');
    cy.wait('@entitiesRequest').then(({ request, response }) => (startingEntitiesCount = response.body.length));
    cy.get(entityCreateButtonSelector).click({ force: true });
    cy.getEntityCreateUpdateHeading('AttachGroup');

    cy.get(`[data-cy="createdAt"]`).type('2021-05-26T09:06').invoke('val').should('equal', '2021-05-26T09:06');

    cy.get(`[data-cy="createdBy"]`).type('75282').should('have.value', '75282');

    cy.setFieldSelectToLastOfEntity('post');

    cy.get(entityCreateSaveButtonSelector).click({ force: true });
    cy.scrollTo('top', { ensureScrollable: false });
    cy.get(entityCreateSaveButtonSelector).should('not.exist');
    cy.intercept('GET', '/api/attach-groups*').as('entitiesRequestAfterCreate');
    cy.visit('/');
    cy.clickOnEntityMenuItem('attach-group');
    cy.wait('@entitiesRequestAfterCreate');
    cy.get(entityTableSelector).should('have.lengthOf', startingEntitiesCount + 1);
    cy.visit('/');
  });

  it('should delete last instance of AttachGroup', () => {
    cy.intercept('GET', '/api/attach-groups*').as('entitiesRequest');
    cy.intercept('DELETE', '/api/attach-groups/*').as('deleteEntityRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('attach-group');
    cy.wait('@entitiesRequest').then(({ request, response }) => {
      startingEntitiesCount = response.body.length;
      if (startingEntitiesCount > 0) {
        cy.get(entityTableSelector).should('have.lengthOf', startingEntitiesCount);
        cy.get(entityDeleteButtonSelector).last().click({ force: true });
        cy.getEntityDeleteDialogHeading('attachGroup').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click({ force: true });
        cy.wait('@deleteEntityRequest');
        cy.intercept('GET', '/api/attach-groups*').as('entitiesRequestAfterDelete');
        cy.visit('/');
        cy.clickOnEntityMenuItem('attach-group');
        cy.wait('@entitiesRequestAfterDelete');
        cy.get(entityTableSelector).should('have.lengthOf', startingEntitiesCount - 1);
      }
      cy.visit('/');
    });
  });
});
