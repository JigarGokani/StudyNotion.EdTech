const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const { uploadImageToCloudinary} = require("../utils/imageUploader");
const Course = require("../models/Course")



// create SubSection

exports.createSubSection = async (req,res) =>{
    try{
        // fetch data from req body
        const {sectionId,title,description} = req.body;
        // extract file/video
        const video = req.files.video;
        // validation
        if(!sectionId || !title || !description || !video){
            return res.status(400).json({
                success:false,
                message:"All feilds are required!",
            });

        }
        // upload video to cloudinary 
        const uploadDetails = await uploadImageToCloudinary(video,process.env.FOLDER_NAME);
        // CRAETE A SUB-SECTION 
        const SubSectionDetails = await SubSection.create({
            title:title,
            // timeDuration:timeDuration,
            description:description,
            videoUrl:uploadDetails.secure_url,

        })
        // update section with this sub section ObjectId
        const updatedSection = await Section.findByIdAndUpdate({_id:sectionId},
                                                    {$push:{
                                                        subSection:SubSectionDetails._id,
                                                    }},
                                                    {new:true}).populate("subSection");

        // HW:log updated section here, after adding populate query
        // return response
        return res.status(200).json({
            success:true,
            message:"Sub Section Created Successfully!",
            data:updatedSection,
        });

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Internal Server Error",
            error:error.message,
        })
    }

}

// UPDATE a sub-section
exports.updateSubSection = async (req, res) => {
    try {
      const { sectionId, subSectionId, title, description } = req.body
      const subSection = await SubSection.findById(subSectionId)
  
      if (!subSection) {
        return res.status(404).json({
          success: false,
          message: "SubSection not found",
        })
      }
  
      if (title !== undefined) {
        subSection.title = title
      }
  
      if (description !== undefined) {
        subSection.description = description
      }
      if (req.files && req.files.video !== undefined) {
        const video = req.files.video
        const uploadDetails = await uploadImageToCloudinary(
          video,
          process.env.FOLDER_NAME
        )
        subSection.videoUrl = uploadDetails.secure_url
        subSection.timeDuration = `${uploadDetails.duration}`
      }
  
      await subSection.save()
  
      // find updated section and return it
      const updatedSection = await Section.findById(sectionId).populate(
        "subSection"
      )
  
      console.log("updated section", updatedSection)
  
      return res.json({
        success: true,
        message: "Section updated successfully",
        data: updatedSection,
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "An error occurred while updating the section",
      })
    }
  }

// delete subsection
exports.deleteSubSection = async(req, res) => {

	try {
		const {subSectionId,courseId} = req.body;
		const sectionId=req.body.sectionId;
	if(!subSectionId || !sectionId){
		return res.status(404).json({
            success: false,
            message: "all fields are required",
        });
	}
	const ifsubSection = await SubSection.findById({_id:subSectionId});
	const ifsection= await Section.findById({_id:sectionId});
	if(!ifsubSection){
		return res.status(404).json({
            success: false,
            message: "Sub-section not found",
        });
	}
	if(!ifsection){
		return res.status(404).json({
            success: false,
            message: "Section not found",
        });
    }
	await SubSection.findByIdAndDelete(subSectionId);
	await Section.findByIdAndUpdate({_id:sectionId},{$pull:{subSection:subSectionId}},{new:true});
	const updatedCourse = await Course.findById(courseId).populate({ path: "courseContent", populate: { path: "subSection" } }).exec();
	return res.status(200).json({ success: true, message: "Sub-section deleted", data: updatedCourse });
		
	} catch (error) {
		// Handle any errors that may occur during the process
        console.error("Error deleting sub-section:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
		
	}
};