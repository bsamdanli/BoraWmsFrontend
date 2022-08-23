import { BoraWmsNewTemplatePage } from './app.po';

describe('BoraWmsNew App', function() {
  let page: BoraWmsNewTemplatePage;

  beforeEach(() => {
    page = new BoraWmsNewTemplatePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
