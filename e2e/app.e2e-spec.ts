import { MensaChemnitzPage } from './app.po';

describe('mensa-chemnitz App', () => {
  let page: MensaChemnitzPage;

  beforeEach(() => {
    page = new MensaChemnitzPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
