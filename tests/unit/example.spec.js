import {expect} from 'chai'
import {shallowMount} from '@vue/test-utils'
import fruits from '@/components/fruits.vue'

describe('fruits.vue', () => {
  it('It has a default list of fruits: apple, orange, grape', () => {
    const wrapper = shallowMount(fruits);
    expect(wrapper.vm.list).to.eql([
      {value: 'apple'},
      {value: 'orange'},
      {value: 'grape'}
    ])
  })
  
  it('When user starts typing, UI will display all fruits that contains the characters', () => {
    const wrapper = shallowMount(fruits);
    const input = wrapper.find('.search');
    wrapper.vm.keyword = 'a';
    input.trigger('keyup');
    expect(wrapper.vm.resultList).to.eql([
      {value: 'apple'},
      {value: 'orange'},
      {value: 'grape'}
    ])
  })
  
  it('If there is no fruit found, user can add the new fruit by pressing enter key', () => {
    const wrapper = shallowMount(fruits);
    const input = wrapper.find('.search');
    wrapper.vm.keyword = 'banana';
    input.trigger('keyup.enter');
    expect(wrapper.vm.list).to.eql([
      {value: 'apple'},
      {value: 'orange'},
      {value: 'grape'},
      {value: 'banana'}
    ])
  })
});
