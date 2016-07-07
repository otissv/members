'use strict';
import isSchema from 'is-schema-valid';


export const addressSchema = {
  address1: 'string',
  address2: 'string',
  city    : 'string',
  state   : 'string',
  country : 'string',
  postCode: 'string',
  rooms   : 'string'
};


export default isSchema(addressSchema);
