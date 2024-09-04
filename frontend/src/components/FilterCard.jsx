import React from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'

const filterData = [
    {
        filterType:"Loaction",
        array:["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
    },
    {
        filterType:"Industry",
        array:["Frontend Developer", "Backend Developer", "Full Stack Developer"]
    },
    {
        filterType:"Salary",
        array:["0-40k", "41K t0 1 lakh", "1 lakh to 5 lakh"]
    },
]

const FilterCard = () => {
  return (
    <div>
      <h1 className='font-bold text-2xl'>Filter Jobs</h1>
      <hr className='mt-3'/>
      <RadioGroup>
        {
            filterData.map((data, index) =>(
                <div>
                    <h1 className='font-bold text-lg'>{data.filterType}</h1>
                    {
                        data.array.map((item, index) => {
                            return(
                                <div className='flex items-center space-x-5 my-4'>
                                    <RadioGroupItem value={item}/>
                                    <Label className="font-medium">{item}</Label>
                                </div>
                            )
                        })
                    }
                </div>
            ))
        }
      </RadioGroup>
    </div>
  )
}

export default FilterCard
