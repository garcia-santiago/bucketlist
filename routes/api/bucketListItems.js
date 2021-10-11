const { Router } = require('express')
const BucketListItem = require('../../models/BucketListItem')
const router = Router()
const excel = require("exceljs");

router.get('/', async (req, res) => {
    try{
        const bucketListItems = await BucketListItem.find()
        if (!bucketListItems) throw new Error('No bucketListItems')
        const sorted = bucketListItems.sort((a, b) => {
            return new Date(a.date).getTime() - new Date(b.date).getTime()
        })
        res.status(200).json(sorted)
    }catch (error) {
        res.status(500).json({ message: error.message })
    }

})
router.get('/excel', async (req, res) => {
    try{

        const bucketListItems = await BucketListItem.find()
        if (!bucketListItems) throw new Error('No bucketListItems')
        const sorted = bucketListItems.sort((a, b) => {
            return new Date(a.date).getTime() - new Date(b.date).getTime()
        })

        let workbook = new excel.Workbook();
        let worksheet = workbook.addWorksheet("Tutorials");
        
        worksheet.columns = [
          { header: "_id", key: "_id"},
          { header: "description", key: "description"},
          { header: "date", key: "date"},
          { header: "__v", key: "__v"},
        ];
        
        // Add Array Rows
        worksheet.addRows(sorted);
        
        // res is a Stream object
        res.setHeader(
          "Content-Type",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeader(
          "Content-Disposition",
          "attachment; filename=" + "tutorials.xlsx"
        );
        
        return workbook.xlsx.write(res).then(function () {
          res.status(200).end();
        });
        
        
    }catch (error) {
        res.status(500).json({ message: error.message })
    }

})

router.post('/', async (req, res) => {
    const newBucketListItem = new BucketListItem(req.body)
    try {
        const bucketListItem = await newBucketListItem.save()
        if (!bucketListItem) throw new Error('Something went wrong saving the bucketListItem')
        res.status(200).json(bucketListItem)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.put('/:id', async (req, res) => {
    const { id } = req.params

    try {
        const response = await BucketListItem.findByIdAndUpdate(id, req.body)
        if (!response) throw Error('Something went wrong ')
        const updated = { ...response._doc, ...req.body }
        res.status(200).json(updated)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const removed = await BucketListItem.findByIdAndDelete(id)
        if (!removed) throw Error('Something went wrong ')
        res.status(200).json(removed)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router