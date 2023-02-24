import { recurse } from "cypress-recurse";
import { aliasQuery, hasOperationName } from "./graphql";

describe("Homepage data validation", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("every item contains required fields", () => {
    cy.getBySel("grid-entry-wrapper")
      .find(`[data-cy="grid-entry-image"]`)
      .should("have.attr", "src");

    cy.getBySel("grid-entry-wrapper")
      .find(`[data-cy="grid-entry-name"]`)
      .should("not.have.text", "");

    cy.getBySel("grid-entry-wrapper")
      .find(`[data-cy="grid-entry-types"]`)
      .should("not.have.text", "");
  });

  it("should show some pokemons", () => {
    cy.getBySel("grid-entry-wrapper").should("have.length", 10);
  });
});

describe("Views", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("displays the grid as default view", () => {
    cy.getBySel("grid-wrapper").should("exist");
    cy.getBySel("list-wrapper").should("not.exist");
  });

  it("changes the view on click", () => {
    cy.getBySel("filter-browsing-view-list").should("be.visible").click();
    cy.getBySel("list-wrapper").should("be.visible");

    cy.getBySel("filter-browsing-view-grid").should("be.visible").click();
    cy.getBySel("grid-wrapper").should("be.visible");
  });

  it('changes the view on the "Tab" key', () => {
    cy.getBySel("grid-wrapper").should("exist");
    cy.getBySel("list-wrapper").should("not.exist");

    cy.getBySel("filter-browsing-view-grid").should("be.visible");
    cy.getBySel("filter-browsing-view-list").should("be.visible");

    cy.window().trigger("keydown", { key: "Tab" });

    cy.getBySel("grid-wrapper").should("not.exist");
    cy.getBySel("list-wrapper").should("exist");

    cy.window().trigger("keydown", { key: "Tab" });

    cy.getBySel("grid-wrapper").should("exist");
    cy.getBySel("list-wrapper").should("not.exist");
  });
});

describe("Pokemon's detail page", () => {
  beforeEach(() => {
    cy.visit("/oddish");
  });

  it("has all information displayed", () => {
    cy.get("h1").should("have.length", 1).should("have.text", "Oddish");

    cy.getBySel("general-info-wrapper").should("exist");
    cy.getBySel("attacks-wrapper").scrollIntoView().should("exist");

    cy.getBySel("pokemon-main-image")
      .should("exist")
      .each(($img: HTMLImageElement[]) => {
        expect($img[0].naturalWidth).to.be.greaterThan(0);
      });

    cy.getBySel("evolution-image")
      .should("have.length.at.least", 1)
      .each(($img: HTMLImageElement[]) => {
        expect($img[0].naturalWidth).to.be.greaterThan(0);
      });
  });

  it(`can play pokemon's sound`, () => {
    cy.getBySel("play-sound").should("be.visible").click();
    cy.getBySel("play-sound").should("not.exist");
    cy.getBySel("stop-sound").should("be.visible");
    cy.getBySel("play-sound").should("be.visible");
    cy.getBySel("stop-sound").should("not.exist");
  });
});

describe("Navigation", () => {
  it("logo should links to the homepage", () => {
    cy.visit("/");

    cy.getBySel("welcome-header")
      .should("have.length", 1)
      .should("have.attr", "href")
      .and("eq", "/");
  });

  it(`should visit pokemon's detail page`, () => {
    cy.visit("/");

    cy.location("pathname").should("eq", "/");

    cy.getBySel("grid-entry-wrapper").find("a").first().click();

    cy.location("pathname", {
      timeout: 10_000,
    }).should("match", /\/.+$/);
  });

  it("main logo should links to the homepage", () => {
    cy.visit("/bulbasaur");

    cy.getBySel("welcome-header").should("have.length", 1).click();

    cy.location("pathname", {
      timeout: 10_000,
    }).should("eq", "/");
  });

  it("The back to the list button redirects to the homepage", () => {
    cy.visit("/bulbasaur");

    cy.getBySel("back-to-list").click();

    cy.location("pathname", {
      timeout: 10_000,
    }).should("eq", "/");
  });

  it("user can browse through pokemon's evolution (navigation)", () => {
    cy.visit("/bulbasaur");

    cy.getBySel("back-button").should("have.attr", "disabled");
    cy.getBySel("next-button").should("not.be.disabled").click();

    cy.location("pathname", {
      timeout: 10_000,
    }).should("eq", "/ivysaur");

    cy.getBySel("back-button")
      .should("not.be.disabled")
      .should("have.attr", "href")
      .and("eq", "/bulbasaur");
    cy.getBySel("next-button").should("not.be.disabled").click();

    cy.location("pathname", {
      timeout: 10_000,
    }).should("eq", "/venusaur");

    cy.getBySel("back-button")
      .should("not.be.disabled")
      .should("have.attr", "href")
      .and("eq", "/ivysaur");
    cy.getBySel("next-button").should("not.be.disabled").click();
  });

  it("user can browse through pokemon's evolution (tiles)", () => {
    cy.visit("/bulbasaur");

    cy.getBySel("evolution-tile-previous").should("not.exist");
    cy.getBySel("evolution-tile-next").click();

    cy.location("pathname", {
      timeout: 10_000,
    }).should("eq", "/ivysaur");

    cy.getBySel("evolution-tile-previous")
      .should("have.attr", "href")
      .and("eq", "/bulbasaur");
    cy.getBySel("evolution-tile-next").click();

    cy.location("pathname", {
      timeout: 10_000,
    }).should("eq", "/venusaur");

    cy.getBySel("evolution-tile-previous")
      .should("have.attr", "href")
      .and("eq", "/ivysaur");
    cy.getBySel("evolution-tile-next").should("not.exist");
  });
});

describe("Filters", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should have 'All' as the default filter", () => {
    cy.getBySel("filter-show-all").should("have.class", "cds--btn--primary");

    cy.getBySel("filter-show-favorite").should(
      "not.have.class",
      "cds--btn--primary"
    );
  });

  it("should show skeleton before load", () => {
    cy.getBySel("grid-skeleton-wrapper").should("have.length", 1);
    cy.getBySel("grid-wrapper").should("have.length", 1);
    cy.getBySel("grid-skeleton-wrapper").should("have.length", 0);
  });

  it("should change view when filters change", () => {
    cy.getBySel("grid-wrapper").should("exist");
    cy.getBySel("filter-show-favorite").click();
    cy.getBySel("grid-wrapper").should("not.exist");
  });

  it("should load different pokemons on filters change", () => {
    let originalIds: string[] = [];
    cy.getBySel("grid-entry-wrapper")
      .should("have.length", 10)
      .find(`[data-cy="grid-entry-name"]`)
      .each((el) => {
        originalIds.push(el.text());
      });

    cy.getBySel("pokemons-type-select").select("Fairy");

    cy.getBySel("grid-entry-wrapper")
      .should("have.length.at.least", 1)
      .find(`[data-cy="grid-entry-types"]`)
      .should("contain.text", "Fairy");

    cy.getBySel("pokemon-search").type("clefa");

    cy.getBySel("grid-entry-wrapper")
      .should("have.length.at.least", 1)
      .find(`[data-cy="grid-entry-name"]`)
      .should("contain.text", "Clefa");

    // reset
    cy.getBySel("pokemons-type-select").select("0");
    cy.getBySel("pokemon-search").siblings(".cds--search-close").click();

    let afterIds: string[] = [];
    cy.getBySel("grid-entry-wrapper")
      .should("have.length", 10)
      .find(`[data-cy="grid-entry-name"]`)
      .each((el) => {
        afterIds.push(el.text());
      })
      .then(() => {
        expect(originalIds).to.deep.eq(afterIds);
      });
  });
});

describe("Empty states", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("shows an empty block for no results", () => {
    cy.getBySel("filter-show-favorite").click();
    cy.getBySel("empty-wrapper").should("be.visible.exist");
  });

  it("shows an empty block for no-favorites", () => {
    cy.getBySel("empty-wrapper").should("not.exist");
    cy.getBySel("pokemon-search").type(
      "This pokemon surely does not exists!{enter}"
    );
    cy.getBySel("empty-wrapper").should("be.visible.exist");
  });
});

describe("Infinite scroll", () => {
  beforeEach(() => {
    let counter = 0;

    cy.intercept("POST", `*/graphql`, (req) => {
      aliasQuery(req, "listPokemon");
      aliasQuery(req, "getSelf");

      if (hasOperationName(req, "listPokemon")) {
        counter++;
        req.reply({
          fixture:
            counter <= 2
              ? `listPokemon-${counter}.json`
              : "listPokemon-empty.json",
        });
      } else {
        req.continue();
      }
    });

    cy.visit("/");
  });

  it("loads more pokemons", () => {
    cy.getBySel("grid-entry-wrapper")
      .should("have.length.at.least", 1)
      .its("length")
      .then((totalCount) => {
        cy.scrollTo("bottom");
        cy.getBySel("grid-entry-wrapper").should("have.length", totalCount * 2);
      });
  });

  it("scrolls until we load all pokemons", () => {
    cy.intercept("*").as("networkRequests");

    recurse(
      () => {
        return cy
          .getBySel("grid-entry-wrapper")
          .should("have.length.at.least", 1)
          .its("length")
          .then((currentCount) => {
            cy.scrollTo("bottom");

            cy.wait("@networkRequests");

            return cy
              .getBySel("grid-entry-wrapper")
              .should("have.length.at.least", 1)
              .its("length")
              .then((newCount) => newCount > currentCount);
          });
      },
      (n) => n === false,
      {
        log: true,
        limit: 150,
        timeout: 60_000,
        delay: 10,
      }
    );
  });
});

describe("Voting/Unvoting", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("can vote and unvote pokemon", () => {
    cy.getBySel("grid-entry-wrapper")
      .first()
      .find(`[data-cy="pokemon-vote-button"]`)
      .first()
      .should("exist")
      .click();

    cy.getBySel("grid-entry-wrapper")
      .first()
      .find(`[data-cy="pokemon-unvote-button"]`)
      .should("exist")
      .click();

    cy.getBySel("grid-entry-wrapper")
      .first()
      .find(`[data-cy="pokemon-voting-status"]`)
      .should("be.visible");

    cy.getBySel("grid-entry-wrapper")
      .first()
      .find(`[data-cy="pokemon-voting-status"]`)
      .should("be.not.visible");

    cy.getBySel("grid-entry-wrapper")
      .first()
      .find(`[data-cy="pokemon-vote-button"]`)
      .should("exist");
  });

  it('can see pokemon in "Favorites" section once voted', () => {
    cy.getBySel("grid-entry-wrapper")
      .first()
      .find(`[data-cy="pokemon-vote-button"]`)
      .should("exist")
      .click();

    cy.getBySel("filter-show-favorite").click();

    cy.getBySel("pokemon-vote-button").should("have.length", 0);

    cy.getBySel("pokemon-unvote-button").should("have.length.at.least", 1);
  });
});
