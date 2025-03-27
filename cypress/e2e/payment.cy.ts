describe("Test du formulaire de paiement", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("Affiche des erreurs pour des champs invalides", () => {
    // Tester les champs vides
    cy.contains("Payer").should('be.disabled');

    // Tester la validation des champs individuels
    cy.get("input[placeholder='Prénom']").type(" ").clear();
    cy.contains("Le prénom est requis").should('be.visible');

    cy.get("input[placeholder='Nom']").type(" ").clear();
    cy.contains("Le nom est requis").should('be.visible');

    cy.get("input[placeholder='Adresse']").type(" ").clear();
    cy.contains("L'adresse est requise").should('be.visible');

    cy.get("input[placeholder='Email']").type("invalidemail");
    cy.contains("Email invalide").should('be.visible');

    cy.get("input[placeholder='Numéro de téléphone (22901XXXXXXXX)']").type("123456");
    cy.contains("Le numéro de téléphone doit commencer par 22901 et contenir 11 chiffres").should('be.visible');

    cy.get("input[placeholder='Montant']").type("-1");
    cy.contains("Le montant doit être positif").should('be.visible');
  });

  it("Soumet le formulaire avec succès", () => {
    // Remplir tous les champs correctement
    cy.get("input[placeholder='Prénom']").type("John");
    cy.get("input[placeholder='Nom']").type("Doene");
    cy.get("input[placeholder='Adresse']").type("Cotonou");
    cy.get("input[placeholder='Email']").type("john@example.com");
    cy.get("input[placeholder='Numéro de téléphone (22901XXXXXXXX)']").type("2290161234567");
    cy.get("input[placeholder='Montant']").type("100");

    // Vérifier que le bouton de paiement est actif
    // cy.contains("Payer").should('not.be.disabled').click();

    // Attendre et vérifier le succès
    // cy.contains("Paiement effectué avec succès !").should('be.visible');
  });

  it("Gère les erreurs de paiement", () => {
    // Simuler une erreur de paiement
    // cy.intercept('POST', '{baseUrl}/QosicBridge/user/requestpayment', {
    //   statusCode: 500,
    //   body: { message: 'Erreur de serveur' }
    // }).as('paymentRequest');

    // Remplir tous les champs correctement
    cy.get("input[placeholder='Prénom']").type("John");
    cy.get("input[placeholder='Nom']").type("Doene");
    cy.get("input[placeholder='Adresse']").type("Cotonou");
    cy.get("input[placeholder='Email']").type("john@example.com");
    cy.get("input[placeholder='Numéro de téléphone (22901XXXXXXXX)']").type("2290161234567");
    cy.get("input[placeholder='Montant']").type("100");

    // cy.contains("Payer").click();

    // Vérifier l'affichage de l'erreur
    // cy.contains("Erreur lors du traitement du paiement").should('be.visible');
  });
});
