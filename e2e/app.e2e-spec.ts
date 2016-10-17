import { LGGPaymetPortalPage } from './app.po';

describe('lggpaymet-portal App', function() {
  let page: LGGPaymetPortalPage;

  beforeEach(() => {
    page = new LGGPaymetPortalPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
