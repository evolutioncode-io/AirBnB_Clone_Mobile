const initialState = {
    rooms: [
        {
            id: 1,
            title: 'New York',
            homeType: 'House',
            image: {uri: 'https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/120445102/original/582239b31d9888936cad4611b98dd470dd50d2e3/build-you-a-nice-house-in-blocksburg.jpeg'},
            bedRoom: 2,
            price: 150,
            instant: true
          },
          {
            id: 2,
            title: 'Coatza',
            homeType: 'House',
            image: {uri: 'https://i.pinimg.com/originals/77/c4/d5/77c4d536db08d773f1aaa3d634425a14.jpg'},
            bedRoom: 2,
            price: 150,
            instant: false
          },
          {
            id: 3,
            title: 'Minatitlan',
            homeType: 'House',
            image: {uri: 'https://odis.homeaway.com/odis/listing/68c67a92-f398-4463-ba1a-5d82fd541193.c10.jpg'},
            bedRoom: 2,
            price: 150,
            instant: true
          },
    ]
}

export default function(state = initialState, action){
    return state;
}