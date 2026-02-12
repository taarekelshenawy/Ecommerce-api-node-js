

class apiFeature {
    constructor(mongooseQuery,queryString){
        this.mongooseQuery=mongooseQuery;
        this.queryString=queryString;

    }

    filter(){
      const queryString ={...this.queryString};
      const excludesFields=["page","limit","sort","fields"];

      excludesFields.forEach((item)=> delete queryString[item]);
        const filters = {};
        for (let key in queryString) {
            if (key.includes("[")) {
            const [field, op] = key.split(/\[|\]/).filter(Boolean); // ['price','gte']
            if (!filters[field]) filters[field] = {};
            filters[field][`$${op}`] = Number(this.queryString[key]); // تحويل الرقم
            } else {
            filters[key] = this.queryString[key];
            }
        }
        this.mongooseQuery = this.mongooseQuery.find(filters)
        return this;
    }

    sort(){
          if (this.queryString.sort) {
                    const sortFields = this.queryString.sort.split(",").join(" "); // ['price','-ratingsAverage']
                 this.mongooseQuery= this.mongooseQuery.sort(sortFields)
                } else {
                       this.mongooseQuery=  this.mongooseQuery.sort("-createdAt")
                 
                }

                return this;

    }

    fieldLimit(){
         if(this.queryString.fields){
            const fields = this.queryString.fields.split(",").join(" ");
            this.mongooseQuery= this.mongooseQuery.select(fields);
        }else {
        this.mongooseQuery= this.mongooseQuery.select("-__v"); // default
        }

        return this;

    }

    paginate(){
        const query = this.queryString;
        const limit = query.limit || 10;
        const page = query.page || 1;
        const skip =(page-1) * limit;
        this.mongooseQuery=this.mongooseQuery.limit(limit).skip(skip);

        return this;

    }
}

module.exports=apiFeature;