import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { localeData } from '../../../reducers/localization';
import {updateSupplier}  from '../../../actions/supplier';
import {SUPPLIER_CONSTANTS as c}  from '../../../utils/constants';

import AppHeader from '../../AppHeader';
import Article from 'grommet/components/Article';
import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading';
import Form from 'grommet/components/Form';
import Footer from 'grommet/components/Footer';
import FormFields from 'grommet/components/FormFields';
import FormField from 'grommet/components/FormField';
import Box from 'grommet/components/Box';
import Section from 'grommet/components/Section';
import Select from 'grommet/components/Select';
import Button from 'grommet/components/Button';
import CloseIcon from 'grommet/components/icons/base/Close';
import Anchor from 'grommet/components/Anchor';


class SupplierEdit extends Component {

  constructor () {
    super();

    this.state = {
      initializing: false,
      supplier: null,
      errors: []
    };

    this.localeData = localeData();
  }

  componentWillMount () {
    console.log('componentWillMount');
    if (!this.props.misc.initialized) {
      this.context.router.push('/supplier');
    }
    let {supplier} = this.props.supplier;
    if ( supplier.address == null) {
      supplier.address = {};
    }
    console.log(supplier);
    this.setState({supplier: supplier});
  }

  componentWillReceiveProps (nextProps) {
    if (!nextProps.supplier.editing) {
      this.context.router.push('/supplier');
    }
    if (sessionStorage.session == undefined) {
      this.context.router.push('/');
    }
  }

  _onSubmit (event) {
    event.preventDefault();
    let {supplier} = this.state;
    if (Object.getOwnPropertyNames(supplier.address).length === 0) {
      delete supplier.address;
    }
    console.log(supplier);
    this.props.dispatch(updateSupplier(supplier));
  }

  _onChange (event) {
    let supplier = this.state.supplier;
    supplier[event.target.getAttribute('name')] = event.target.value;
    this.setState({supplier: supplier});
  }

  _onChangeAddress (event) {
    let supplier = this.state.supplier;
    supplier.address[event.target.getAttribute('name')] = event.target.value;
    this.setState({supplier: supplier});
  }

  _sTypeFilter (event) {
    let {supplier} = this.state;
    supplier.supplierType = event.value;
    this.setState({supplier: supplier});
  }

  _onClose (event) {
    this.props.dispatch({type: c.SUPPLIER_EDIT_FORM_TOGGLE, payload: {editing: false, supplier: {}}});
  }


  render () {
    const {supplier,errors} = this.state;

    return (
      <Box>
        <AppHeader/>
        <Section>
          <Article align="center" pad={{horizontal: 'medium'}} primary={true}>
            <Form onSubmit={this._onSubmit}>

              <Header size="large" justify="between" pad="none">
                <Heading tag="h2" margin="none" strong={true}>{this.localeData.label_supplier_edit}</Heading>
                <Anchor icon={<CloseIcon />} path="/supplier" a11yTitle='Close Add Supplier Form' onClick={this._onClose.bind(this)} />
              </Header>

              <FormFields>

                <fieldset>
                  <FormField label="Supplier Name" error={errors[0]}>
                    <input type="text" name="name" value={supplier.name} onChange={this._onChange.bind(this)} />
                  </FormField>
                  <FormField label="Contact Person" error={errors[0]}>
                    <input type="text" name="contactPerson" value={supplier.contactPerson} onChange={this._onChange.bind(this)} />
                  </FormField>
                  <FormField label="Supplier Type" htmlFor="sType" error={errors[0]}>
                    <Select id="sType" name="sType" options={['LOCAL','NON_LOCAL']}
                      value={supplier.supplierType}  onChange={this._sTypeFilter.bind(this)} />
                  </FormField>
                </fieldset>

                <fieldset>
                  <Box direction="row" justify="between">
                    <Heading tag="h3">Address</Heading>
                  </Box>
                  <FormField label="Street" error={errors[0]}>
                    <input type="text" name="street" value={supplier.address.street} onChange={this._onChangeAddress.bind(this)} />
                  </FormField>
                  <FormField label="Landmark" error={errors[0]}>
                    <input type="text" name="landmark" value={supplier.address.landmark} onChange={this._onChangeAddress.bind(this)} />
                  </FormField>
                  <FormField label="City" error={errors[0]}>
                    <input type="text" name="city" value={supplier.address.city} onChange={this._onChangeAddress.bind(this)} />
                  </FormField>
                  <FormField label="State" error={errors[0]}>
                    <input type="text" name="state" value={supplier.address.state} onChange={this._onChangeAddress.bind(this)} />
                  </FormField>
                  <FormField label="Country" error={errors[0]}>
                    <input type="text" name="country" value={supplier.address.country} onChange={this._onChangeAddress.bind(this)} />
                  </FormField>
                  <FormField label="Pin" error={errors[0]}>
                    <input type="text" name="zip" value={supplier.address.zip} onChange={this._onChangeAddress.bind(this)} />
                  </FormField>
                </fieldset>

              </FormFields>

              <Footer pad={{vertical: 'medium'}}>
                <span />
                <Button type="submit" primary={true} label={this.localeData.supplier_edit_btn}
                  onClick={this._onSubmit.bind(this)} />
              </Footer>
            </Form>
          </Article>

        </Section>
      </Box>
      
    );
  }
}

SupplierEdit.contextTypes = {
  router: PropTypes.object
};

let select = (store) => {
  return {supplier: store.supplier, misc: store.misc};
};

export default connect(select)(SupplierEdit);
