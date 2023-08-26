deploy:
	docker build -t congvan203/catarina-vendure --platform linux/amd64 .
	docker push congvan203/catarina-vendure
	ssh admin@dnote "cd /home/admin/apps/catarina-vendure; make"