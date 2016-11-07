import { renderComponent, expect } from '../test_helper';
import CommentList from '../../src/components/comment_list';
describe('CommentList', () => {
  let component;

  beforeEach(() => {
    const props =  { comments: ['New Comment', 'Other'] };
    component = renderComponent(CommentList, null, props);
  });

  it('shows an LI', () => {
    expect(component.find('li').length).to.equal(2);

  });

  it('show each comment that is provided', () => {
    expect(component).to.contain('New Comment');
    expect(component).to.contain('Other');

  });
})
