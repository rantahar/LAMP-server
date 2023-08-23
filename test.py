import LAMP

server_address = "localhost:3000"
access_key = "admin"
secret_key = "0c64468247b038eff593844c0692f3d2bdc16ea56262290165fe8f67a78652e0"
LAMP.connect(access_key, secret_key, server_address)


new_researcher = LAMP.models.researcher.Researcher(
    name="Test Tester", email="test@example.com",
    address="testerstreet 2"
)
researcher_id = LAMP.Researcher.create(new_researcher)["data"]
print(new_researcher, researcher_id)


new_study = LAMP.models.study.Study(
    name="Test study"
)
study_id = LAMP.Study.create(researcher_id, new_researcher)["data"]
print(new_study, study_id)


new_participant = LAMP.models.participant.Participant()
participant_id = LAMP.Participant.create(study_id, new_participant)["data"]["id"]
print(new_participant, participant_id)


print(LAMP.Participant.all_by_study(study_id))

LAMP.Participant.delete(participant_id)
LAMP.Study.delete(study_id)
LAMP.Researcher.delete(researcher_id)

