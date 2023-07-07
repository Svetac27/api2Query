import * as Yup from 'yup'

export const checkSchema = () => {
  return Yup.object().shape({
    mainTable: Yup.string().required('Required'),
    tableReference: Yup.string().when('mainTable', (mainTable, schema) => {
      return schema
        .test('not-same-as-mainTable', 'must be different from Main Table', (value) => {
          return value !== mainTable[0]
        })
        .required('Required')
    }),
    queryType: Yup.string().required('Required'),
    joinType: Yup.string().required('Required'),
    targetColumn: Yup.string().required('Required'),
    localColumn: Yup.string().required('Required'),
    orderSymbol: Yup.string(),
    limitedBy: Yup.string(),
    offsetBy: Yup.string(),
    orderBy: Yup.string(),
    gropuedBy: Yup.array().of(Yup.string())
  })
}
