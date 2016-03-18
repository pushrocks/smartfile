"use strict";
exports.toVar = function (options, cb) {
    var bodyString;
    request.get(options.from, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            bodyString = body;
            console.log('successfully requested' + options.from);
            if (options.parseJson = true) {
                var jsonObject = JSON.parse(bodyString);
                return jsonObject;
            }
            ;
        }
        else {
            console.log('could not get get remote file from ' + options.from);
            return bodyString = 'could not get file';
        }
        ;
    });
    return bodyString;
};
exports.toFS = function (options, cb) {
    if (cb === void 0) { cb = undefined; }
    var stream = request(options.from).pipe(fs.createWriteStream(options.toPath));
    if (cb != undefined)
        stream.on('finish', cb);
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNtYXJ0ZmlsZS5yZW1vdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUdXLGFBQUssR0FBRyxVQUFDLE9BQXdDLEVBQUUsRUFBRTtJQUM1RCxJQUFJLFVBQWlCLENBQUM7SUFDdEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLFVBQVUsS0FBSyxFQUFFLFFBQVEsRUFBRSxJQUFJO1FBQ3JELEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLFFBQVEsQ0FBQyxVQUFVLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQztZQUN2QyxVQUFVLEdBQUcsSUFBSSxDQUFDO1lBQ2xCLE9BQU8sQ0FBQyxHQUFHLENBQUMsd0JBQXdCLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3JELEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDM0IsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDeEMsTUFBTSxDQUFDLFVBQVUsQ0FBQztZQUN0QixDQUFDO1lBQUEsQ0FBQztRQUNOLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMscUNBQXFDLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2xFLE1BQU0sQ0FBQyxVQUFVLEdBQUcsb0JBQW9CLENBQUE7UUFDNUMsQ0FBQztRQUFBLENBQUM7SUFDTixDQUFDLENBQUMsQ0FBQztJQUVILE1BQU0sQ0FBQyxVQUFVLENBQUM7QUFDdEIsQ0FBQyxDQUFDO0FBRVMsWUFBSSxHQUFHLFVBQVMsT0FBbUMsRUFBRSxFQUFZO0lBQVosa0JBQVksR0FBWixjQUFZO0lBQ3hFLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUM5RSxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksU0FBUyxDQUFDO1FBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUMsRUFBRSxDQUFDLENBQUM7QUFDaEQsQ0FBQyxDQUFBIiwiZmlsZSI6InNtYXJ0ZmlsZS5yZW1vdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi90eXBpbmdzL21haW4uZC50c1wiIC8+XG5pbXBvcnQgcGx1Z2lucyA9IHJlcXVpcmUoXCIuL3NtYXJ0ZmlsZS5wbHVnaW5zXCIpO1xuXG5leHBvcnQgbGV0IHRvVmFyID0gKG9wdGlvbnM6e2Zyb206c3RyaW5nLHBhcnNlSnNvbj86Ym9vbGVhbn0sIGNiKTphbnkgPT4ge1xuICAgIHZhciBib2R5U3RyaW5nOnN0cmluZztcbiAgICByZXF1ZXN0LmdldChvcHRpb25zLmZyb20sIGZ1bmN0aW9uIChlcnJvciwgcmVzcG9uc2UsIGJvZHkpIHtcbiAgICAgICAgaWYgKCFlcnJvciAmJiByZXNwb25zZS5zdGF0dXNDb2RlID09IDIwMCkge1xuICAgICAgICAgICAgYm9keVN0cmluZyA9IGJvZHk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnc3VjY2Vzc2Z1bGx5IHJlcXVlc3RlZCcgKyBvcHRpb25zLmZyb20pO1xuICAgICAgICAgICAgaWYgKG9wdGlvbnMucGFyc2VKc29uID0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIHZhciBqc29uT2JqZWN0ID0gSlNPTi5wYXJzZShib2R5U3RyaW5nKTtcbiAgICAgICAgICAgICAgICByZXR1cm4ganNvbk9iamVjdDtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnY291bGQgbm90IGdldCBnZXQgcmVtb3RlIGZpbGUgZnJvbSAnICsgb3B0aW9ucy5mcm9tKTtcbiAgICAgICAgICAgIHJldHVybiBib2R5U3RyaW5nID0gJ2NvdWxkIG5vdCBnZXQgZmlsZSdcbiAgICAgICAgfTtcbiAgICB9KTtcblxuICAgIHJldHVybiBib2R5U3RyaW5nO1xufSxcblxuZXhwb3J0IGxldCB0b0ZTID0gZnVuY3Rpb24ob3B0aW9uczp7ZnJvbTpzdHJpbmcsdG9QYXRoOnN0cmluZ30sIGNiPXVuZGVmaW5lZCkge1xuICAgIHZhciBzdHJlYW0gPSByZXF1ZXN0KG9wdGlvbnMuZnJvbSkucGlwZShmcy5jcmVhdGVXcml0ZVN0cmVhbShvcHRpb25zLnRvUGF0aCkpO1xuICAgIGlmIChjYiAhPSB1bmRlZmluZWQpIHN0cmVhbS5vbignZmluaXNoJyxjYik7XG59Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
