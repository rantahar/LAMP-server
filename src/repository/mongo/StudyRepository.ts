import { uuid } from "../Bootstrap"
import { Study } from "../../model/Study"
import { StudyModel } from "../../model/Study"
import { StudyInterface } from "../interface/RepositoryInterface"

export class StudyRepository implements StudyInterface {
  public async _select(id: string | null, parent = false): Promise<Study[]> {
    //get data from study via study model
    const data = await StudyModel.find(!!id ? (parent ? { "#parent": id } : { _id: id }) : {})
      .sort({ timestamp: 1 })
      .limit(2_147_483_647)
    return (data as any).map((x: any) => ({
      id: x._doc._id,
      ...x._doc,
      _id: undefined,
      "#parent": undefined,
      __v: undefined,
      timestamp: undefined,
    }))
  }
  public async _insert(researcher_id: string, object: Study): Promise<string> {
    const _id = uuid()
    //save data in CouchDb/Mongo
    await new StudyModel({
      _id: _id,
      "#parent": researcher_id,
      timestamp: new Date().getTime(),
      name: object.name ?? "",
    } as any).save()

    return _id
  }
  public async _update(study_id: string, object: Study): Promise<{}> {
    const orig: any = await StudyModel.findById(study_id)
    await StudyModel.findByIdAndUpdate(study_id, { name: object.name ?? orig.name })
    return {}
  }
  public async _delete(study_id: string): Promise<{}> {
    await StudyModel.deleteOne({ _id: study_id })
    return {}
  }
}
