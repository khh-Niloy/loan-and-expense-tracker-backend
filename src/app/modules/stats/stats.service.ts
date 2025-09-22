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

    const monthlyLoanTaken = await Loan.aggregate([
        {
            $group: {
                _id: {
                    month: {
                      $dateToString: { format: "%Y-%m", date: { $toDate: "$createdAt" } }
                    }
                  },
                totalAmount: {$sum: "$amount"},
            }
        },
        {
            $project: {
                _id: 0,
                monthName: {
                    $dateToString: { format: "%B", date: { $toDate: "$_id.month" } }
                  },
                totalAmount: 1
            }
        }
    ])

    const loanPayDates = await Loan.aggregate([
        {
          $match: { loanPayDate: { $exists: true } }
        },
        {
          $project: {
            loanPayDate: 1,
            loanGiver_number: 1,
            loanGiver_name: 1,
            remainingAmount: 1,
            payLoanDaysLeft: {
                $max: [
                  0,
                  {
                    $floor: {
                      $divide: [
                        { $subtract: [{ $toDate: "$loanPayDate" }, new Date()] },
                        1000 * 60 * 60 * 24
                      ]
                    }
                  }
                ]
              }
          }
        }
      ]);

    return {categoryBasedLoanPending, userBasedLoanPending, monthlyLoanTaken, loanPayDates}
}

const expenseStatsService = async(phoneNumber: string)=>{

    const user = await User.findOne({phoneNumber})

    if(!user) {
        throw new Error("User not found")
    }

    
}

export const statsService = {
    categoryWithUserLoanList,
    expenseStatsService
}