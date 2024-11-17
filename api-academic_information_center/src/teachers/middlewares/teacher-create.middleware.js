export function teacherSerializable(req,res,next){
    const json = res.json;
    res.json = function (data){
        if(data && data.teacher){
            delete data.teacher.password;
        }
        return json.call(this,data);
    };
    next();
}