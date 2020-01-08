export class Product {
    constructor(
        public image:String,
        public productCategory: String,
        public productName: String,
        public productPrice: Number,
        public productColor: String,        
        public productBrand: String,
        public productCamera: String,
        public productMemory: String,
        public productProcessor: String,
        public productAvailability: String,
        public userRating: {},
        public totalRating: Number,
        public productDescription:String,
        public length:String,
        
        public _id:String    
    ) { }
}
