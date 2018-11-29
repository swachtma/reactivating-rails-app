FROM busybox as step1
RUN touch step1.txt

FROM step1 as step2
RUN touch step2.txt

FROM step1 as step3
RUN touch step3.txt
CMD [ "bash" ]

