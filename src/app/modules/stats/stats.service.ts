import { Loan } from "../loan/loan.model"
import { User } from "../user/user.model"

const categoryWithUserLoanList = async (phoneNumber: string) => {
    const user = await User.findOne({phoneNumber})

    if(!user) {
        throw new Error("User not found")
    }

    const categoryBasedLoanPending = await Loan.aggregate([
        {
            $match: {remainingAmount: {$ne: 0}}
        },
        {
            $group: {
                _id: "$loanCategory",
                totalRemaining: {$sum: "$remainingAmount"},
                loanPayDate: { $first: { $ifNull: ["$loanPayDate", null] } }
            }
        },
        {
            $project: {
                _id: 0,
                category: "$_id",
                totalRemaining: 1,
                loanPayDate: 1
            }
        }
    ])


    const userBasedLoanPending = await Loan.aggregate([
        {
            $match: {remainingAmount: {$ne: 0}}
        },
        {
            $group: {
                _id: "$loanGiver_number",
                totalRemaining: {$sum: "$remainingAmount"},
                name: {$first: "$loanGiver_name"}
            }
        },
        {
            $project: {
                _id: 0,
                loanGiver_number: "$_id",
                totalRemaining: 1,
                name: 1
            }
        }
    ])

    return {categoryBasedLoanPending, userBasedLoanPending}
}

export const statsService = {
    categoryWithUserLoanList
}