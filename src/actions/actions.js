import fetch from 'isomorphic-fetch';

export const REQUEST_DATA = 'REQUEST_DATA';
export const RECEIVE_DATA = 'RECEIVE_DATA';
export const SELECT_FRIEND_DATASET = 'SELECT_FRIEND_DATASET';
export const INVALIDATE_DATASET = 'INVALIDATE_DATASET';

export function selectFriendDataset(dataset) {
  return {
    type: SELECT_FRIEND_DATASET,
    dataset
  };
}

export function invalidateDataset(dataset) {
  return {
    type: INVALIDATE_DATASET,
    dataset
  };
}

function requestData(dataset) {
  return {
    type: REQUEST_DATA,
    dataset
  };
}

//This is the Map part
function receiveData(dataset, json) {
  return {
    type: RECEIVE_DATA,
    dataset,
    data: json.all,
    receivedAt: Date.now()
  };
}

function fetchData(dataset) {
  return dispatch => {
    dispatch(requestData(dataset));
    // return fetch(`http://www.user.com/r/${user}.json`)
    // return fetch(`http://127.0.0.1:5000/${user}`)

    var options = {
      credentials: localStorage.getItem('credentials')
    }

    var ip = window.location.hostname;

    return fetch(`http://` + ip + `:3000/${dataset}/?credentials=` + options.credentials)
      .then(req => req.json())
      .then(json => dispatch(receiveData(dataset, json)));
  };
}

function shouldFetchData(state, dataset) {
  const data = state.dataByDataset[dataset];
  if (!data) {
    return true;
  } else if (data.isFetching) {
    return false;
  } else {
    return data.didInvalidate;
  }
}

export function fetchDataIfNeeded(dataset) {
  return (dispatch, getState) => {
    if (shouldFetchData(getState(), dataset)) {
      return dispatch(fetchData(dataset));
    }
  };
}
