import React from 'react'

const ResumePage = async () => {
    const resume = await getResume();
    return (
        <div>
            <ResumeBuilder/>
        </div>
    )
}

export default ResumePage
