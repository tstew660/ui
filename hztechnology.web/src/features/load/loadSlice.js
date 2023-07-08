import { createSlice } from '@reduxjs/toolkit'
import { Pause } from 'heroicons-react';


const initialState = {
  quote: {},
  shipmentAddress: {
    streetNumber: null,
    streetName: null,
    city: null,
    state: null,
    zipCode: null,
    lat: null,
    lng: null
  },
  destinationAddress: {
    streetNumber: null,
    streetName: null,
    city: null,
    state: null,
    zipCode: null,
    lat: null,
    lng: null
  },
  totalDistance: null,
  carrier: {
    name: null,
    contactName: null,
    email: null,
    phone: null,
    fax: null,
    mcNumber: null
  },
  commodity: [],
  carrierRate: 0,
  totalWeight: 0,
  shipper: {
    name: null,
    contactName: null,
    email: null,
    phone: null,
    fax: null
  },
  truckType: null,
  charges: [],
  customerRate: 0,
  specialInstructions: null,
  pickUpDate: null,
  deliveryDate: null,
  status: 0
}

const loadSlice = createSlice({
  name: 'load',
  initialState,
  reducers: {
    setCommodities: (state, { payload }) => {
      state.commodity = payload.commodity;
      state.totalWeight = payload.totalWeight;
      state.specialInstructions = payload.specialInstructions;
    },
    setCarrier: (state, { payload }) => {
      console.log(payload);
      state.carrier = payload.carrier;
    },
    setShipper: (state, { payload }) => {
      state.shipper = payload.shipper;
    },
    setRouteLocations: (state, { payload }) => {
      console.log(payload)
      state.shipmentAddress = payload.shipmentAddress;
      state.destinationAddress = payload.destinationAddress;
      state.pickUpDate = payload.pickUpDate;
      state.deliveryDate = payload.deliveryDate;
      state.totalDistance = payload.totalDistance;
    },
    setRates: (state, { payload }) => {
      state.carrierRate = payload.carrierRate;
      state.customerRate = payload.customerRate;
      state.charges = payload.charges;
    },
    addCharge: (state, { payload }) => {
      payload.id = state.charges.length
      state.charges.push(payload)
    },
    editCharge: (state, { payload }) => {
      console.log(payload)
      state.charges.filter(x => x.id == payload.id)[0].rate = payload.lineItem.rate;
      state.charges.filter(x => x.id == payload.id)[0].notes = payload.lineItem.notes;
      state.charges.filter(x => x.id == payload.id)[0].quantity = payload.lineItem.quantity;
      state.charges.filter(x => x.id == payload.id)[0].accessorial = payload.lineItem.accessorial;
      state.charges.filter(x => x.id == payload.id)[0].total = payload.lineItem.rate * payload.lineItem.quantity;
    },
  }
})

export const { setCommodities, setCarrier, setShipper, setRouteLocations, setRates, addCharge, editCharge } = loadSlice.actions

export default loadSlice.reducer