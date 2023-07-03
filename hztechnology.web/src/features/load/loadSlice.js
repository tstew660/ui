import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  quote: {},
  shipmentAddress: {
    city: null,
    state: null,
    zipCode: null
  },
  destinationAddress: {
    city: null,
    state: null,
    zipCode: null
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
      state.shipper = payload;
    },
    setLocations: (state, { payload }) => {
      state.shipmentAddress = payload.shipmentAddress;
      state.destinationAddress = payload.destinationAddress;
      state.pickUpDate = payload.pickUpDate;
      state.deliveryDate = payload.deliveryDate;
      state.totalDistance = payload.totalDistance;
    },
    setRates: (state, { payload }) => {
      state.carrierRate = payload.carrierRate;
      state.customerRate = payload.customerRate
    },
  }
})

export const { setCommodities, setCarrier, setShipper, setLocations, setRates } = loadSlice.actions

export default loadSlice.reducer