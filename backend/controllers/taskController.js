

exports.getDailyTasks = async (req, res) => {
    try {
        return res.status(200).json({status:'success get'})
    } catch (error) {
        console.log(error)
    }
}

exports.addDailyTask = async (req, res) => {
    try {
        return res.status(200).json({status:'success add'})
    } catch (error) {
        console.log(error)
    }
}


